export type SeatTier = 'vip' | 'prime' | 'classic';

export interface Seat {
  id: string; // e.g. "A5"
  row: string; // "A"
  number: number; // 5
  tier: SeatTier;
  price: number;
}

export interface Movie {
  id: string;
  title: string;
  genre: string[];
  rating: number;
  votesCount: string;
  duration: string;
  releaseDate: string;
  formats: string[];
  languages: string[];
  director: string;
  cast: string[];
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  certificate: string;
  accentColor?: string;
  trailerUrl: string;
  trailerYoutubeId: string;
}

export interface CinemaVenue {
  id: string;
  name: string;
  city: string;
  location: string;
  distance: string;
  facilities: string[];
  showtimes: {
    id: string;
    time: string;
    period: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
    format: string;
    language: string;
    priceMultiplier: number;
  }[];
}

export interface SnackItem {
  id: string;
  name: string;
  category: 'Popcorn' | 'Combos' | 'Beverages' | 'Snacks';
  description: string;
  price: number;
  calories: string;
  isVeg: boolean;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
}

export interface ShowDateItem {
  isoDate: string;
  label: string;
  subLabel: string;
  fullFormatted: string;
}

export interface BookingRecord {
  id: string;
  bookingCode: string;
  movie: {
    id: string;
    title: string;
    posterUrl: string;
    certificate: string;
    duration: string;
  };
  cinema: {
    id: string;
    name: string;
    location: string;
    screen: string;
  };
  showDate: string;
  showTime: string;
  format: string;
  language: string;
  seats: string[];
  seatTiers: { seatId: string; tier: SeatTier; price: number }[];
  snacks: { item: SnackItem; quantity: number }[];
  baseAmount: number;
  snackAmount: number;
  convenienceFee: number;
  taxes: number;
  totalAmount: number;
  customer: CustomerInfo;
  paymentMethod: string;
  bookedAt: string;
  status: 'confirmed' | 'cancelled';
}
