import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import {
  supabase,
  isSupabaseConfigured,
  fetchProfile,
  upsertProfile,
  fetchReservations,
  saveReservation,
} from '../lib/supabase';
import { UserProfile, UserReservation, ReservationData } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  reservations: UserReservation[];
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signInWithGoogle: () => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updatePassword: (password: string) => Promise<{ error?: string }>;
  updateProfileData: (updates: Partial<UserProfile>) => Promise<{ error?: string }>;
  createReservation: (data: ReservationData) => Promise<{ error?: string; bookingRef?: string }>;
  refreshReservations: () => Promise<void>;
  notification: { type: 'success' | 'error' | 'info'; message: string } | null;
  clearNotification: () => void;
  showNotification: (type: 'success' | 'error' | 'info', message: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [reservations, setReservations] = useState<UserReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const isConfigured = isSupabaseConfigured();

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4500);
  };

  const clearNotification = () => setNotification(null);

  // Initialize and sync profile
  const syncProfile = async (currentUser: User) => {
    const existing = await fetchProfile(currentUser.id);
    if (existing) {
      setProfile(existing);
    } else {
      // Auto-create profile from user metadata (e.g. from Signup or Google Auth)
      const userMeta = currentUser.user_metadata || {};
      const newProfile: UserProfile = {
        id: currentUser.id,
        full_name:
          userMeta.full_name ||
          userMeta.name ||
          currentUser.email?.split('@')[0] ||
          'Valued Guest',
        email: currentUser.email || '',
        avatar_url: userMeta.avatar_url || userMeta.picture || null,
        created_at: new Date().toISOString(),
      };
      await upsertProfile(newProfile);
      setProfile(newProfile);
    }

    // Also fetch user's reservations
    const userRes = await fetchReservations(currentUser.id);
    setReservations(userRes);
  };

  // Auth state change listener & initial session retrieval
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        if (isConfigured) {
          const { data, error } = await supabase.auth.getSession();
          if (!error && data?.session?.user && mounted) {
            setSession(data.session);
            setUser(data.session.user);
            await syncProfile(data.session.user);
          }
        } else {
          // If Supabase credentials are not yet configured in .env, check if a demo user is cached
          const demoUser = localStorage.getItem('aura_demo_user');
          if (demoUser && mounted) {
            const parsed = JSON.parse(demoUser);
            setUser(parsed);
            await syncProfile(parsed);
          }
        }
      } catch (err) {
        console.warn('Initial session check notice:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    initAuth();

    let authSubscription: { unsubscribe: () => void } | null = null;

    if (isConfigured) {
      const { data } = supabase.auth.onAuthStateChange(async (event, newSession) => {
        if (!mounted) return;
        setSession(newSession);
        const currentUser = newSession?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          await syncProfile(currentUser);
        } else {
          setProfile(null);
          setReservations([]);
        }
      });
      authSubscription = data.subscription;
    }

    return () => {
      mounted = false;
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, [isConfigured]);

  // Sign Up
  const signUp = async (email: string, password: string, fullName: string) => {
    if (!email || !password || !fullName) {
      return { error: 'Please fill in all required fields.' };
    }
    if (password.length < 6) {
      return { error: 'Password must be at least 6 characters long.' };
    }

    if (isConfigured) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: fullName.trim(),
            },
          },
        });

        if (error) {
          return { error: mapSupabaseError(error.message) };
        }

        if (data.user) {
          const newProfile: UserProfile = {
            id: data.user.id,
            full_name: fullName.trim(),
            email: email.trim(),
            created_at: new Date().toISOString(),
          };
          await upsertProfile(newProfile);
          setProfile(newProfile);
          showNotification('success', 'Account created successfully. Welcome to AURA!');
          return {};
        }

        return { error: 'Unable to complete sign up. Please try again.' };
      } catch (err: any) {
        return { error: mapSupabaseError(err?.message || 'Network error occurred.') };
      }
    } else {
      // Demo fallback mode when credentials are pending
      const mockId = `user_${Date.now()}`;
      const mockUser: any = {
        id: mockId,
        email: email.trim(),
        user_metadata: { full_name: fullName.trim() },
        created_at: new Date().toISOString(),
      };
      const mockProfile: UserProfile = {
        id: mockId,
        full_name: fullName.trim(),
        email: email.trim(),
        created_at: new Date().toISOString(),
      };

      localStorage.setItem('aura_demo_user', JSON.stringify(mockUser));
      await upsertProfile(mockProfile);
      setUser(mockUser);
      setProfile(mockProfile);
      showNotification('success', 'Account created! Welcome to AURA Fine Dining.');
      return {};
    }
  };

  // Sign In
  const signIn = async (email: string, password: string) => {
    if (!email || !password) {
      return { error: 'Please enter your email and password.' };
    }

    if (isConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          return { error: mapSupabaseError(error.message) };
        }

        if (data.user) {
          setUser(data.user);
          setSession(data.session);
          await syncProfile(data.user);
          showNotification('success', `Welcome back, ${data.user.user_metadata?.full_name || 'Guest'}!`);
          return {};
        }
        return { error: 'Sign in failed. Please check your credentials.' };
      } catch (err: any) {
        return { error: mapSupabaseError(err?.message || 'Sign in error.') };
      }
    } else {
      // Demo fallback mode
      const cached = localStorage.getItem('aura_demo_user');
      let targetUser: any = null;
      if (cached) {
        targetUser = JSON.parse(cached);
      } else {
        targetUser = {
          id: `user_${Date.now()}`,
          email: email.trim(),
          user_metadata: { full_name: email.split('@')[0] },
          created_at: new Date().toISOString(),
        };
        localStorage.setItem('aura_demo_user', JSON.stringify(targetUser));
      }
      setUser(targetUser);
      await syncProfile(targetUser);
      showNotification('success', 'Signed in successfully. Welcome back to AURA!');
      return {};
    }
  };

  // Google OAuth
  const signInWithGoogle = async () => {
    if (isConfigured) {
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin,
          },
        });
        if (error) {
          return { error: mapSupabaseError(error.message) };
        }
        return {};
      } catch (err: any) {
        return { error: mapSupabaseError(err?.message || 'Google OAuth failed.') };
      }
    } else {
      // Provide guidance and graceful demo login
      showNotification(
        'info',
        'Google OAuth will connect directly to your Supabase Project. Signing in with demo patron account for testing.'
      );
      const googleMockUser: any = {
        id: `google_${Date.now()}`,
        email: 'patron@example.com',
        user_metadata: {
          full_name: 'Arthur Pendelton',
          avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        },
      };
      localStorage.setItem('aura_demo_user', JSON.stringify(googleMockUser));
      setUser(googleMockUser);
      await syncProfile(googleMockUser);
      return {};
    }
  };

  // Sign Out
  const signOut = async () => {
    if (isConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Sign out notice:', err);
      }
    }
    localStorage.removeItem('aura_demo_user');
    setUser(null);
    setSession(null);
    setProfile(null);
    setReservations([]);
    showNotification('info', 'You have been logged out of AURA.');
  };

  // Reset Password
  const resetPassword = async (email: string) => {
    if (!email) return { error: 'Please enter your account email address.' };

    if (isConfigured) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: window.location.origin,
        });
        if (error) return { error: mapSupabaseError(error.message) };
        showNotification('success', 'Password reset instructions have been sent to your email.');
        return {};
      } catch (err: any) {
        return { error: mapSupabaseError(err?.message || 'Failed to request reset.') };
      }
    } else {
      showNotification(
        'success',
        'Password reset link simulated. Check your inbox for reset instructions.'
      );
      return {};
    }
  };

  // Update Password
  const updatePassword = async (password: string) => {
    if (!password || password.length < 6) {
      return { error: 'New password must be at least 6 characters.' };
    }
    if (isConfigured) {
      try {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) return { error: mapSupabaseError(error.message) };
        showNotification('success', 'Your password has been updated successfully.');
        return {};
      } catch (err: any) {
        return { error: mapSupabaseError(err?.message || 'Password update failed.') };
      }
    } else {
      showNotification('success', 'Password updated successfully.');
      return {};
    }
  };

  // Update User Profile
  const updateProfileData = async (updates: Partial<UserProfile>) => {
    if (!profile) return { error: 'No profile found.' };
    const updated: UserProfile = { ...profile, ...updates };
    setProfile(updated);
    const { error } = await upsertProfile(updated);
    if (error) {
      return { error: 'Failed to update remote profile.' };
    }
    showNotification('success', 'Profile updated successfully.');
    return {};
  };

  // Create and associate reservation with user
  const createReservation = async (data: ReservationData) => {
    const bookingRef = `AURA-${Math.floor(100000 + Math.random() * 900000)}`;
    const newReservation: UserReservation = {
      ...data,
      id: `res_${Date.now()}`,
      user_id: user?.id,
      booking_ref: bookingRef,
      status: 'confirmed',
      created_at: new Date().toISOString(),
    };

    const { error } = await saveReservation(newReservation);
    if (error) {
      console.warn('Remote reservation insert notice:', error);
    }

    setReservations((prev) => [newReservation, ...prev]);
    return { bookingRef };
  };

  const refreshReservations = async () => {
    const res = await fetchReservations(user?.id);
    setReservations(res);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        isConfigured,
        reservations,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        resetPassword,
        updatePassword,
        updateProfileData,
        createReservation,
        refreshReservations,
        notification,
        clearNotification,
        showNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Map raw Supabase errors to clean luxury copy
function mapSupabaseError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('invalid login credentials') || lower.includes('invalid_credentials')) {
    return 'Invalid email or password. Please verify your credentials.';
  }
  if (lower.includes('user already registered') || lower.includes('already exists')) {
    return 'An account with this email address already exists. Please log in.';
  }
  if (lower.includes('password should be at least') || lower.includes('weak_password')) {
    return 'Password is too weak. Please use at least 6 characters.';
  }
  if (lower.includes('invalid email') || lower.includes('valid email')) {
    return 'Please provide a valid email address.';
  }
  if (lower.includes('rate limit') || lower.includes('too many requests')) {
    return 'Too many login attempts. Please wait a moment and try again.';
  }
  if (lower.includes('network') || lower.includes('failed to fetch')) {
    return 'Network connection issue. Please check your internet connection.';
  }
  return message;
}
