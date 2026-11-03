import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserProfile, UserReservation } from '../types';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are valid non-placeholder values
export const isSupabaseConfigured = (): boolean => {
  if (!rawUrl || !rawKey) return false;
  if (rawUrl.includes('your-project') || rawUrl.includes('MY_SUPABASE_URL')) return false;
  if (rawKey.includes('your-supabase') || rawKey.includes('MY_KEY')) return false;
  return true;
};

// Safe fallback URL for client initialization
const supabaseUrl = isSupabaseConfigured()
  ? rawUrl
  : 'https://placeholder-aura.supabase.co';

const supabaseAnonKey = isSupabaseConfigured()
  ? rawKey
  : 'placeholder-anon-key';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/**
 * SQL Schema for Reference:
 * 
 * -- 1. Create profiles table
 * create table if not exists public.profiles (
 *   id uuid references auth.users on delete cascade primary key,
 *   full_name text,
 *   email text,
 *   avatar_url text,
 *   phone text,
 *   dietary_preferences text,
 *   created_at timestamp with time zone default timezone('utc'::text, now()) not null
 * );
 * 
 * -- 2. Enable RLS
 * alter table public.profiles enable row level security;
 * 
 * create policy "Public profiles are viewable by owner." on public.profiles
 *   for select using (auth.uid() = id);
 * 
 * create policy "Users can insert their own profile." on public.profiles
 *   for insert with check (auth.uid() = id);
 * 
 * create policy "Users can update their own profile." on public.profiles
 *   for update using (auth.uid() = id);
 * 
 * -- 3. Create reservations table
 * create table if not exists public.reservations (
 *   id uuid default gen_random_uuid() primary key,
 *   user_id uuid references auth.users on delete set null,
 *   booking_ref text not null,
 *   name text not null,
 *   email text not null,
 *   phone text,
 *   date date not null,
 *   time text not null,
 *   guests integer not null,
 *   seating_area text not null,
 *   special_requests text,
 *   dietary_restrictions text,
 *   status text default 'confirmed',
 *   created_at timestamp with time zone default timezone('utc'::text, now()) not null
 * );
 * 
 * alter table public.reservations enable row level security;
 * 
 * create policy "Users can read own reservations" on public.reservations
 *   for select using (auth.uid() = user_id or auth.uid() is null);
 * 
 * create policy "Users can insert reservations" on public.reservations
 *   for insert with check (true);
 */

// Local fallback store for offline/demo reliability
const LOCAL_STORAGE_PROFILE_KEY = 'aura_user_profile';
const LOCAL_STORAGE_RESERVATIONS_KEY = 'aura_user_reservations';

export async function fetchProfile(userId: string): Promise<UserProfile | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        return data as UserProfile;
      }
    } catch {
      // Fall through to local cache
    }
  }

  // Fallback to local storage if remote not reachable
  try {
    const cached = localStorage.getItem(`${LOCAL_STORAGE_PROFILE_KEY}_${userId}`);
    if (cached) return JSON.parse(cached);
  } catch {}

  return null;
}

export async function upsertProfile(profile: UserProfile): Promise<{ error: any }> {
  // Always cache locally for instant UI update
  try {
    localStorage.setItem(
      `${LOCAL_STORAGE_PROFILE_KEY}_${profile.id}`,
      JSON.stringify(profile)
    );
  } catch {}

  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert(profile, { onConflict: 'id' });
      return { error };
    } catch (err) {
      return { error: err };
    }
  }

  return { error: null };
}

export async function fetchReservations(userId?: string): Promise<UserReservation[]> {
  const localList: UserReservation[] = [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_RESERVATIONS_KEY);
    if (raw) {
      const parsed: UserReservation[] = JSON.parse(raw);
      if (userId) {
        localList.push(...parsed.filter((r) => r.user_id === userId || !r.user_id));
      } else {
        localList.push(...parsed);
      }
    }
  } catch {}

  if (isSupabaseConfigured() && userId) {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        // Map database columns to UserReservation
        const mapped: UserReservation[] = data.map((d: any) => ({
          id: d.id,
          user_id: d.user_id,
          booking_ref: d.booking_ref,
          name: d.name,
          email: d.email,
          phone: d.phone,
          date: d.date,
          time: d.time,
          guests: d.guests,
          seatingArea: d.seating_area,
          specialRequests: d.special_requests,
          dietaryRestrictions: d.dietary_restrictions,
          status: d.status || 'confirmed',
          created_at: d.created_at,
        }));
        return mapped;
      }
    } catch {}
  }

  return localList;
}

export async function saveReservation(reservation: UserReservation): Promise<{ error: any }> {
  // Always persist locally
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_RESERVATIONS_KEY);
    const list: UserReservation[] = raw ? JSON.parse(raw) : [];
    const updated = [reservation, ...list.filter((r) => r.id !== reservation.id)];
    localStorage.setItem(LOCAL_STORAGE_RESERVATIONS_KEY, JSON.stringify(updated));
  } catch {}

  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from('reservations').insert({
        id: reservation.id,
        user_id: reservation.user_id || null,
        booking_ref: reservation.booking_ref,
        name: reservation.name,
        email: reservation.email,
        phone: reservation.phone || null,
        date: reservation.date,
        time: reservation.time,
        guests: reservation.guests,
        seating_area: reservation.seatingArea,
        special_requests: reservation.specialRequests || null,
        dietary_restrictions: reservation.dietaryRestrictions || null,
        status: reservation.status,
      });
      return { error };
    } catch (err) {
      return { error: err };
    }
  }

  return { error: null };
}
