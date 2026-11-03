export interface MenuItem {
  id: string;
  name: string;
  frenchName?: string;
  category: 'starters' | 'mains' | 'desserts' | 'tasting';
  price: string;
  description: string;
  ingredients: string[];
  winePairing: string;
  dietary?: string[];
  image: string;
  isSignature?: boolean;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  favoriteDish: string;
}

export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  courses: string;
  duration: string;
  pricePerPerson: string;
  features: string[];
  image: string;
  badge?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  span: 'small' | 'medium' | 'large';
}

export interface ReservationData {
  date: string;
  time: string;
  guests: number;
  seatingArea: string;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
  dietaryRestrictions?: string;
}

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string | null;
  phone?: string | null;
  created_at?: string;
  dietary_preferences?: string | null;
}

export interface UserReservation extends ReservationData {
  id: string;
  user_id?: string;
  booking_ref: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

