import { BookingRecord } from '../types/booking';

const BOOKED_SEATS_KEY = 'cinepass_booked_seats_v1';
const BOOKING_HISTORY_KEY = 'cinepass_booking_history_v1';

// Seed realistic pre-occupied seats for distinct sessions so theater feels active
const DEFAULT_PRE_BOOKED: Record<string, string[]> = {
  default: ['A3', 'A4', 'C6', 'C7', 'D8', 'D9', 'E5', 'E6', 'F10', 'G3', 'G4', 'H7', 'H8'],
};

export function getSessionKey(movieId: string, cinemaId: string, date: string, showtimeId: string): string {
  return `${movieId}__${cinemaId}__${date}__${showtimeId}`;
}

export function getBookedSeatsForSession(sessionKey: string): string[] {
  try {
    const raw = localStorage.getItem(BOOKED_SEATS_KEY);
    const map: Record<string, string[]> = raw ? JSON.parse(raw) : {};
    
    // If no existing record for this specific session, initialize with seed
    if (!map[sessionKey]) {
      // Create a deterministic set of pre-booked seats based on sessionKey hash
      const seedList = generateDeterministicPrebooked(sessionKey);
      map[sessionKey] = seedList;
      localStorage.setItem(BOOKED_SEATS_KEY, JSON.stringify(map));
      return seedList;
    }

    return map[sessionKey] || [];
  } catch (e) {
    console.error('Error reading booked seats from localStorage', e);
    return DEFAULT_PRE_BOOKED.default;
  }
}

export function saveBookedSeatsForSession(sessionKey: string, newBookedSeatIds: string[]): void {
  try {
    const raw = localStorage.getItem(BOOKED_SEATS_KEY);
    const map: Record<string, string[]> = raw ? JSON.parse(raw) : {};
    
    const existing = map[sessionKey] || [];
    const merged = Array.from(new Set([...existing, ...newBookedSeatIds]));
    map[sessionKey] = merged;
    
    localStorage.setItem(BOOKED_SEATS_KEY, JSON.stringify(map));
  } catch (e) {
    console.error('Error saving booked seats to localStorage', e);
  }
}

export function releaseSeatsForSession(sessionKey: string, seatIdsToRelease: string[]): void {
  try {
    const raw = localStorage.getItem(BOOKED_SEATS_KEY);
    if (!raw) return;
    const map: Record<string, string[]> = JSON.parse(raw);
    if (map[sessionKey]) {
      const releaseSet = new Set(seatIdsToRelease);
      map[sessionKey] = map[sessionKey].filter((id) => !releaseSet.has(id));
      localStorage.setItem(BOOKED_SEATS_KEY, JSON.stringify(map));
    }
  } catch (e) {
    console.error('Error releasing seats', e);
  }
}

export function getBookingHistory(): BookingRecord[] {
  try {
    const raw = localStorage.getItem(BOOKING_HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading booking history', e);
    return [];
  }
}

export function saveBookingToHistory(booking: BookingRecord): void {
  try {
    const history = getBookingHistory();
    const updated = [booking, ...history];
    localStorage.setItem(BOOKING_HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving booking history', e);
  }
}

export function cancelBookingRecord(bookingId: string): boolean {
  try {
    const history = getBookingHistory();
    const record = history.find((b) => b.id === bookingId);
    if (!record) return false;

    // Release the booked seats
    const sessionKey = getSessionKey(record.movie.id, record.cinema.id, record.showDate, record.showTime);
    releaseSeatsForSession(sessionKey, record.seats);

    // Update status in history
    const updated = history.map((b) =>
      b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
    );
    localStorage.setItem(BOOKING_HISTORY_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.error('Error cancelling booking', e);
    return false;
  }
}

function generateDeterministicPrebooked(sessionKey: string): string[] {
  const pool = [
    'A2', 'A7', 'A8', 'B4', 'B5',
    'C4', 'C5', 'C9', 'C10',
    'D3', 'D7', 'D8', 'D12',
    'E6', 'E7', 'E8',
    'F5', 'F6', 'F11',
    'G7', 'G8', 'H4', 'H5', 'I6', 'I7'
  ];
  
  let hash = 0;
  for (let i = 0; i < sessionKey.length; i++) {
    hash = (hash << 5) - hash + sessionKey.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);
  
  // Pick 8 to 12 seats consistently for this sessionKey
  const count = 8 + (absHash % 6);
  const picked: string[] = [];
  for (let i = 0; i < count; i++) {
    const idx = (absHash + i * 7) % pool.length;
    if (!picked.includes(pool[idx])) {
      picked.push(pool[idx]);
    }
  }
  return picked;
}
