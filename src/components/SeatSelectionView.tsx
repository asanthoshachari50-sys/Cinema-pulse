import React, { useState, useEffect } from 'react';
import { ArrowLeft, Info, Check, ShieldCheck, Armchair } from 'lucide-react';
import { Movie, CinemaVenue, Seat, SeatTier, ShowDateItem } from '../types/booking';
import { generateTheaterSeats } from '../data/mockData';
import { getSessionKey, getBookedSeatsForSession } from '../utils/storage';

interface SeatSelectionViewProps {
  movie: Movie;
  cinema: CinemaVenue;
  showDate: ShowDateItem;
  showtime: { id: string; time: string; format: string; language: string; priceMultiplier: number };
  onBack: () => void;
  onProceedToCheckout: (selectedSeats: Seat[], totalAmount: number) => void;
}

export const SeatSelectionView: React.FC<SeatSelectionViewProps> = ({
  movie,
  cinema,
  showDate,
  showtime,
  onBack,
  onProceedToCheckout,
}) => {
  const [allSeats, setAllSeats] = useState<Seat[]>([]);
  const [bookedSeatIds, setBookedSeatIds] = useState<string[]>([]);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);

  const sessionKey = getSessionKey(movie.id, cinema.id, showDate.isoDate, showtime.id);

  // Load seats & booked state for this session on mount
  useEffect(() => {
    const seats = generateTheaterSeats();
    // Adjust prices according to showtime multiplier
    const adjustedSeats = seats.map((s) => ({
      ...s,
      price: Math.round(s.price * showtime.priceMultiplier),
    }));
    setAllSeats(adjustedSeats);

    // Fetch persistent booked seats for this specific session
    const currentBooked = getBookedSeatsForSession(sessionKey);
    setBookedSeatIds(currentBooked);
    setSelectedSeatIds([]); // reset selection
  }, [sessionKey, showtime.priceMultiplier]);

  const toggleSeat = (seatId: string) => {
    if (bookedSeatIds.includes(seatId)) return; // Already booked! Cannot select

    if (selectedSeatIds.includes(seatId)) {
      setSelectedSeatIds((prev) => prev.filter((id) => id !== seatId));
    } else {
      if (selectedSeatIds.length >= 8) {
        alert('You can select a maximum of 8 seats per booking transaction.');
        return;
      }
      setSelectedSeatIds((prev) => [...prev, seatId]);
    }
  };

  const selectedSeatsList = allSeats.filter((s) => selectedSeatIds.includes(s.id));
  const subtotal = selectedSeatsList.reduce((acc, s) => acc + s.price, 0);

  // Group seats by tier
  const vipSeats = allSeats.filter((s) => s.tier === 'vip');
  const primeSeats = allSeats.filter((s) => s.tier === 'prime');
  const classicSeats = allSeats.filter((s) => s.tier === 'classic');

  const renderSeatRow = (seatsInRow: Seat[], maxSeatsInRow: number) => {
    return (
      <div className="flex items-center justify-center gap-1.5 sm:gap-2">
        {seatsInRow.map((seat, index) => {
          const isBooked = bookedSeatIds.includes(seat.id);
          const isSelected = selectedSeatIds.includes(seat.id);

          // Aisle spacing after seat 4 and seat 10
          const hasAisleAfter = index === 3 || index === 9;

          return (
            <React.Fragment key={seat.id}>
              <button
                type="button"
                disabled={isBooked}
                onClick={() => toggleSeat(seat.id)}
                title={
                  isBooked
                    ? `Seat ${seat.id} - Already Booked / Sold Out`
                    : `Seat ${seat.id} (${seat.tier.toUpperCase()}) - ₹${seat.price}`
                }
                className={`group relative flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-t-md rounded-b-[2px] text-[10px] sm:text-xs font-semibold transition-all duration-150 ${
                  isBooked
                    ? 'cursor-not-allowed bg-zinc-800/80 text-zinc-600 border border-zinc-800'
                    : isSelected
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/50 scale-105 border border-rose-400'
                    : 'border border-white/20 bg-white/5 text-slate-300 hover:border-rose-400 hover:bg-rose-500/20 hover:text-white'
                }`}
              >
                {isBooked ? (
                  <span className="text-[9px]">✕</span>
                ) : (
                  <span>{seat.number}</span>
                )}
              </button>

              {hasAisleAfter && (
                <div className="w-3 sm:w-6" aria-hidden="true" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const renderSeatTierBlock = (
    tierName: string,
    badgeText: string,
    price: number,
    seatsInTier: Seat[],
    rowLabels: string[]
  ) => {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3 px-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {tierName}
            </span>
            <span className="text-[11px] text-slate-500 font-normal">
              · {badgeText}
            </span>
          </div>
          <div className="text-xs font-bold text-rose-400 tabular-nums">
            ₹{price}
          </div>
        </div>

        <div className="space-y-2">
          {rowLabels.map((row) => {
            const seatsInRow = seatsInTier.filter((s) => s.row === row);
            return (
              <div key={row} className="flex items-center justify-center gap-3">
                <span className="w-4 text-center text-xs font-bold text-slate-400">
                  {row}
                </span>
                {renderSeatRow(seatsInRow, seatsInRow.length)}
                <span className="w-4 text-center text-xs font-bold text-slate-400">
                  {row}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between">
      {/* Top Header Bar */}
      <div className="sticky top-0 z-30 border-b border-white/10 bg-[#0f111a]/95 backdrop-blur-md px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Change Show</span>
            </button>

            <div>
              <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>{movie.title}</span>
                <span className="hidden sm:inline text-xs text-rose-400 font-medium">({showtime.format})</span>
              </h1>
              <p className="text-[11px] text-slate-400">
                {cinema.name} • {showDate.label}, {showDate.subLabel} at {showtime.time}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="hidden md:inline text-slate-400">Screen 2 (IMAX 3D Laser)</span>
          </div>
        </div>
      </div>

      {/* Main Seating Canvas */}
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6">
        {/* Curved Screen Graphic */}
        <div className="relative mb-12 flex flex-col items-center">
          <div className="h-2 w-3/4 max-w-md rounded-t-full bg-gradient-to-r from-transparent via-rose-500/80 to-transparent shadow-[0_-8px_25px_rgba(244,63,94,0.6)]" />
          <svg className="w-full max-w-lg h-6 overflow-visible" viewBox="0 0 400 24">
            <path
              d="M 20 20 Q 200 0 380 20"
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="2"
            />
          </svg>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            <span>All Eyes This Way · Screen</span>
          </div>
        </div>

        {/* Seat Status Legend */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 bg-white/[0.02] border border-white/5 rounded-xl py-2.5 px-4 max-w-xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-t-sm rounded-b-[1px] border border-white/20 bg-white/5" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-t-sm rounded-b-[1px] bg-rose-600 border border-rose-400 shadow-sm" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-t-sm rounded-b-[1px] bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[9px] text-zinc-500">
              ✕
            </div>
            <span>Booked / Sold</span>
          </div>
        </div>

        {/* Realistic Tiered Seats */}
        <div className="overflow-x-auto pb-6">
          <div className="min-w-[640px]">
            {/* VIP TIER */}
            {renderSeatTierBlock(
              'VIP Royal Recliner',
              'Plush Wide Motorized Recliners with Footrest',
              Math.round(450 * showtime.priceMultiplier),
              vipSeats,
              ['A', 'B']
            )}

            {/* PRIME TIER */}
            {renderSeatTierBlock(
              'Prime Executive',
              'Optimal Center View with High Dynamic Comfort',
              Math.round(280 * showtime.priceMultiplier),
              primeSeats,
              ['C', 'D', 'E', 'F']
            )}

            {/* CLASSIC TIER */}
            {renderSeatTierBlock(
              'Classic Club',
              'Standard Theater Seating',
              Math.round(190 * showtime.priceMultiplier),
              classicSeats,
              ['G', 'H', 'I']
            )}
          </div>
        </div>
      </div>

      {/* Floating Bottom Sticky Bar */}
      <div className="sticky bottom-0 z-30 border-t border-white/10 bg-[#0f111a]/95 backdrop-blur-md px-4 py-3 sm:px-6 shadow-2xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400">
                Selected Seats ({selectedSeatIds.length})
              </div>
              <div className="flex flex-wrap gap-1.5 mt-0.5 min-h-[26px] items-center">
                {selectedSeatIds.length === 0 ? (
                  <span className="text-xs text-slate-500 italic">
                    Tap on seats above to select your spots
                  </span>
                ) : (
                  selectedSeatsList.map((s) => (
                    <span
                      key={s.id}
                      className="rounded bg-rose-600/30 border border-rose-500/50 px-2 py-0.5 text-xs font-bold text-rose-300"
                    >
                      {s.id}
                    </span>
                  ))
                )}
              </div>
            </div>

            {selectedSeatIds.length > 0 && (
              <div className="border-l border-white/10 pl-3">
                <div className="text-[11px] uppercase tracking-wider text-slate-400">
                  Total Amount
                </div>
                <div className="text-base font-extrabold text-white tabular-nums">
                  ₹{subtotal.toLocaleString()}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              disabled={selectedSeatIds.length === 0}
              onClick={() => onProceedToCheckout(selectedSeatsList, subtotal)}
              className={`flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-7 py-3 text-xs sm:text-sm font-bold transition shadow-lg ${
                selectedSeatIds.length > 0
                  ? 'bg-rose-600 text-white shadow-rose-600/30 hover:bg-rose-500 hover:shadow-rose-600/50 active:scale-95'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5'
              }`}
            >
              <span>Proceed to Pay & Book</span>
              {selectedSeatIds.length > 0 && (
                <span className="rounded bg-rose-900/80 px-2 py-0.5 text-xs tabular-nums">
                  ₹{subtotal}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
