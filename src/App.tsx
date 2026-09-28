/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { MovieCatalog } from './components/MovieCatalog';
import { ShowtimePickerModal } from './components/ShowtimePickerModal';
import { SeatSelectionView } from './components/SeatSelectionView';
import { CheckoutModal } from './components/CheckoutModal';
import { BookingSuccessModal } from './components/BookingSuccessModal';
import { TrailerModal } from './components/TrailerModal';
import { MyBookingsDrawer } from './components/MyBookingsDrawer';
import { TheatersView } from './components/TheatersView';
import { SnacksView } from './components/SnacksView';
import { ExperiencesView } from './components/ExperiencesView';
import { Footer } from './components/Footer';

import { Movie, CinemaVenue, Seat, BookingRecord, ShowDateItem } from './types/booking';
import { MOVIES, CINEMAS, getAvailableDates } from './data/mockData';
import { getBookingHistory } from './utils/storage';

export default function App() {
  const [currentCity, setCurrentCity] = useState('Hyderabad');
  const [activeNav, setActiveNav] = useState('movies');

  // Modal & Flow states
  const [selectedMovieForShowtimes, setSelectedMovieForShowtimes] = useState<Movie | null>(null);

  // Active Seating Session (if not null, renders the theater seating canvas)
  const [currentSeatingSession, setCurrentSeatingSession] = useState<{
    movie: Movie;
    cinema: CinemaVenue;
    showDate: ShowDateItem;
    showtime: { id: string; time: string; format: string; language: string; priceMultiplier: number };
  } | null>(null);

  // Checkout modal state
  const [checkoutData, setCheckoutData] = useState<{
    selectedSeats: Seat[];
    totalAmount: number;
  } | null>(null);

  // Successful Confirmed Booking Window
  const [confirmedBookingRecord, setConfirmedBookingRecord] = useState<BookingRecord | null>(null);

  // Active Trailer Player Modal
  const [movieForTrailer, setMovieForTrailer] = useState<Movie | null>(null);

  // My Bookings Drawer
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [bookingHistoryCount, setBookingHistoryCount] = useState(0);

  // Refresh booking count on mount & changes
  const refreshBookingCount = () => {
    const history = getBookingHistory();
    const active = history.filter((b) => b.status === 'confirmed');
    setBookingHistoryCount(active.length);
  };

  useEffect(() => {
    refreshBookingCount();
  }, []);

  // Handlers
  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovieForShowtimes(movie);
  };

  const handleSelectShowtime = (selection: {
    movie: Movie;
    cinema: CinemaVenue;
    showDate: ShowDateItem;
    showtime: { id: string; time: string; format: string; language: string; priceMultiplier: number };
  }) => {
    setSelectedMovieForShowtimes(null); // close showtime modal
    setCurrentSeatingSession(selection); // launch seat selection view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToCheckout = (selectedSeats: Seat[], totalAmount: number) => {
    setCheckoutData({ selectedSeats, totalAmount });
  };

  const handleBookingConfirmed = (booking: BookingRecord) => {
    // 1. Close checkout modal
    setCheckoutData(null);
    // 2. Clear seating session (or keep it sync)
    setCurrentSeatingSession(null);
    // 3. Open Booking Confirmation Ticket Window
    setConfirmedBookingRecord(booking);
    // 4. Update count
    refreshBookingCount();
  };

  // Explicit Close Window handler as requested by user
  const handleCloseBookingWindow = () => {
    setConfirmedBookingRecord(null);
  };

  const handleViewMyBookingsFromSuccess = () => {
    setConfirmedBookingRecord(null);
    setIsMyBookingsOpen(true);
  };

  const handleSelectCinemaForBooking = (cinemaId: string) => {
    // Choose the first blockbuster movie for this cinema
    setSelectedMovieForShowtimes(MOVIES[0]);
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header Bar */}
      <Header
        currentCity={currentCity}
        onSelectCity={setCurrentCity}
        bookingCount={bookingHistoryCount}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        activeNav={activeNav}
        onSelectNav={(nav) => {
          setActiveNav(nav);
          setCurrentSeatingSession(null);
        }}
      />

      {/* Main View Switching */}
      {currentSeatingSession ? (
        /* Seating Layout Canvas */
        <SeatSelectionView
          movie={currentSeatingSession.movie}
          cinema={currentSeatingSession.cinema}
          showDate={currentSeatingSession.showDate}
          showtime={currentSeatingSession.showtime}
          onBack={() => setCurrentSeatingSession(null)}
          onProceedToCheckout={handleProceedToCheckout}
        />
      ) : (
        /* Browse Experience */
        <main className="flex-1">
          {activeNav === 'movies' && (
            <>
              {/* Featured Blockbuster Banner */}
              <HeroBanner
                movie={MOVIES[0]}
                onBookNow={handleSelectMovie}
                onWatchTrailer={(movie) => setMovieForTrailer(movie)}
              />

              {/* Movies Grid & Catalog */}
              <MovieCatalog
                movies={MOVIES}
                onSelectMovie={handleSelectMovie}
                onWatchTrailer={(movie) => setMovieForTrailer(movie)}
              />
            </>
          )}

          {activeNav === 'theaters' && (
            <TheatersView onSelectCinemaForBooking={handleSelectCinemaForBooking} />
          )}

          {activeNav === 'experiences' && (
            <ExperiencesView onBookBlockbuster={() => handleSelectMovie(MOVIES[0])} />
          )}

          {activeNav === 'snacks' && (
            <SnacksView />
          )}

          <Footer
            onOpenMyBookings={() => setIsMyBookingsOpen(true)}
            onNavigateMovies={() => setActiveNav('movies')}
          />
        </main>
      )}

      {/* Showtime Picker Modal */}
      {selectedMovieForShowtimes && (
        <ShowtimePickerModal
          movie={selectedMovieForShowtimes}
          onClose={() => setSelectedMovieForShowtimes(null)}
          onSelectShowtime={handleSelectShowtime}
        />
      )}

      {/* Official YouTube Trailer Modal */}
      {movieForTrailer && (
        <TrailerModal
          movie={movieForTrailer}
          onClose={() => setMovieForTrailer(null)}
          onBookTickets={handleSelectMovie}
        />
      )}

      {/* Checkout "Pay & Book" Modal Window */}
      {checkoutData && currentSeatingSession && (
        <CheckoutModal
          movie={currentSeatingSession.movie}
          cinema={currentSeatingSession.cinema}
          showDate={currentSeatingSession.showDate}
          showtime={currentSeatingSession.showtime}
          selectedSeats={checkoutData.selectedSeats}
          onClose={() => setCheckoutData(null)}
          onBookingConfirmed={handleBookingConfirmed}
        />
      )}

      {/* Booking Confirmed Window with Close Window Action */}
      {confirmedBookingRecord && (
        <BookingSuccessModal
          booking={confirmedBookingRecord}
          onCloseWindow={handleCloseBookingWindow}
          onViewMyBookings={handleViewMyBookingsFromSuccess}
        />
      )}

      {/* My Bookings Side Drawer */}
      <MyBookingsDrawer
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        onSelectBooking={(booking) => {
          setConfirmedBookingRecord(booking);
        }}
        onBookingCancelled={refreshBookingCount}
      />
    </div>
  );
}
