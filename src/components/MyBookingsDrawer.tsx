import React, { useState, useEffect } from 'react';
import { X, Ticket, Calendar, Clock, MapPin, Trash2, ExternalLink, QrCode } from 'lucide-react';
import { BookingRecord } from '../types/booking';
import { getBookingHistory, cancelBookingRecord } from '../utils/storage';

interface MyBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBooking: (booking: BookingRecord) => void;
  onBookingCancelled: () => void;
}

export const MyBookingsDrawer: React.FC<MyBookingsDrawerProps> = ({
  isOpen,
  onClose,
  onSelectBooking,
  onBookingCancelled,
}) => {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);

  useEffect(() => {
    if (isOpen) {
      setBookings(getBookingHistory());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCancel = (booking: BookingRecord) => {
    const ok = window.confirm(
      `Are you sure you want to cancel booking #${booking.bookingCode} for ${booking.movie.title}? The seats (${booking.seats.join(
        ', '
      )}) will be released.`
    );
    if (!ok) return;

    cancelBookingRecord(booking.id);
    setBookings(getBookingHistory());
    onBookingCancelled();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#10121b] text-slate-100 shadow-2xl">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#0c0d14]">
          <div className="flex items-center gap-2">
            <Ticket className="h-5 w-5 text-rose-500" />
            <h2 className="font-['Syne',sans-serif] text-base font-bold text-white">
              My Booked Tickets
            </h2>
            <span className="rounded-full bg-rose-600/20 px-2 py-0.5 text-[11px] font-bold text-rose-400 tabular-nums">
              {bookings.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {bookings.length === 0 ? (
            <div className="my-20 flex flex-col items-center justify-center text-center px-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-4">
                <Ticket className="h-8 w-8 text-slate-500" />
              </div>
              <h3 className="text-sm font-bold text-white">No Booked Tickets Yet</h3>
              <p className="text-xs text-slate-400 max-w-xs mt-1">
                Choose a movie, select your favorite theater seats, click pay & book to get your instant ticket pass.
              </p>
              <button
                onClick={onClose}
                className="mt-5 rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-rose-500"
              >
                Browse Now Showing
              </button>
            </div>
          ) : (
            bookings.map((booking) => {
              const isCancelled = booking.status === 'cancelled';

              return (
                <div
                  key={booking.id}
                  className={`rounded-xl border p-4 transition ${
                    isCancelled
                      ? 'border-white/5 bg-white/[0.01] opacity-60'
                      : 'border-white/15 bg-white/[0.03] hover:border-rose-500/40 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-start justify-between pb-3 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-9 overflow-hidden rounded bg-slate-800 shrink-0">
                        <img
                          src={booking.movie.posterUrl}
                          alt={booking.movie.title}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white line-clamp-1">
                          {booking.movie.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                          <span>{booking.format}</span>
                          <span>·</span>
                          <span>{booking.cinema.name}</span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isCancelled
                          ? 'bg-zinc-800 text-zinc-400'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {/* Booking details */}
                  <div className="grid grid-cols-2 gap-2 py-3 text-xs text-slate-300">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Date & Time</span>
                      <span className="font-semibold text-white">
                        {booking.showDate} · {booking.showTime}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 block">Seats Booked</span>
                      <span className="font-bold text-rose-400">
                        {booking.seats.join(', ')}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                    <div className="font-mono text-[11px] text-slate-400">
                      #{booking.bookingCode}
                    </div>

                    <div className="flex items-center gap-2">
                      {!isCancelled && (
                        <button
                          onClick={() => handleCancel(booking)}
                          title="Cancel booking and release seats"
                          className="flex items-center gap-1 rounded px-2 py-1 text-[11px] text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span>Cancel</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          onSelectBooking(booking);
                          onClose();
                        }}
                        className="flex items-center gap-1 rounded bg-rose-600/20 border border-rose-500/40 px-2.5 py-1 text-[11px] font-semibold text-rose-300 hover:bg-rose-600 hover:text-white transition"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>View Ticket</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
