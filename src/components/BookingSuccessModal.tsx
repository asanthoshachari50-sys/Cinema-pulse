import React from 'react';
import {
  CheckCircle2,
  X,
  Printer,
  Share2,
  MapPin,
  Calendar,
  Clock,
  Film,
  Ticket,
  Sparkles,
} from 'lucide-react';
import { BookingRecord } from '../types/booking';
import { QrCodeSvg } from './QrCodeSvg';

interface BookingSuccessModalProps {
  booking: BookingRecord;
  onCloseWindow: () => void;
  onViewMyBookings: () => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  booking,
  onCloseWindow,
  onViewMyBookings,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Movie Tickets: ${booking.movie.title}`,
        text: `Booked ${booking.seats.length} tickets for ${booking.movie.title} at ${booking.cinema.name} (${booking.showTime})!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `CinePass Booking #${booking.bookingCode} for ${booking.movie.title} - Seats: ${booking.seats.join(', ')}`
      );
      alert('Ticket details copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-lg overflow-y-auto">
      <div className="relative my-8 flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#12141f] shadow-2xl">
        {/* Top Success Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md shadow-inner">
                <CheckCircle2 className="h-7 w-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-['Syne',sans-serif] text-xl sm:text-2xl font-extrabold tracking-tight">
                    Booking Confirmed!
                  </h2>
                  <span className="flex items-center gap-1 rounded bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    <Sparkles className="h-3 w-3" /> Live
                  </span>
                </div>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Your theater seats are locked & confirmed. E-ticket has been sent to {booking.customer.email}.
                </p>
              </div>
            </div>

            {/* Direct Close Window Button 'X' */}
            <button
              onClick={onCloseWindow}
              title="Close this booking window"
              className="rounded-full bg-black/20 p-2 text-white hover:bg-black/40 transition active:scale-90"
              aria-label="Close window"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Ticket Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Authentic CinePass Digital Ticket Card */}
          <div className="relative rounded-2xl border border-white/15 bg-gradient-to-b from-[#181a26] to-[#0f111a] shadow-xl overflow-hidden">
            {/* Top perforated notch left & right */}
            <div className="p-5 sm:p-6">
              {/* Header inside ticket */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-11 overflow-hidden rounded-md bg-slate-800 shrink-0">
                    <img
                      src={booking.movie.posterUrl}
                      alt={booking.movie.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400">
                      Official Cinema Admission Ticket
                    </span>
                    <h3 className="font-['Syne',sans-serif] text-lg sm:text-xl font-extrabold text-white">
                      {booking.movie.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span>{booking.format}</span>
                      <span>·</span>
                      <span>{booking.language}</span>
                      <span>·</span>
                      <span>{booking.movie.certificate}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400">
                    Booking ID
                  </div>
                  <div className="font-mono text-sm font-bold text-rose-400 tracking-wider">
                    {booking.bookingCode}
                  </div>
                </div>
              </div>

              {/* Theater & Time Details Grid */}
              <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-4 border-b border-white/10 text-xs">
                <div>
                  <div className="text-slate-400 text-[11px]">Cinema & Screen</div>
                  <div className="font-bold text-white mt-0.5 leading-snug">
                    {booking.cinema.name}
                  </div>
                  <div className="text-[10px] text-slate-500">{booking.cinema.screen}</div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px]">Date & Time</div>
                  <div className="font-bold text-white mt-0.5">
                    {booking.showTime}
                  </div>
                  <div className="text-[10px] text-slate-400">{booking.showDate}</div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px]">Seats Booked ({booking.seats.length})</div>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {booking.seats.map((seat) => (
                      <span
                        key={seat}
                        className="rounded bg-rose-600/30 border border-rose-500/50 px-1.5 py-0.5 text-xs font-extrabold text-rose-300"
                      >
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px]">Amount Paid</div>
                  <div className="text-base font-extrabold text-emerald-400 tabular-nums mt-0.5">
                    ₹{booking.totalAmount.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400">{booking.paymentMethod}</div>
                </div>
              </div>

              {/* Snacks if any */}
              {booking.snacks.length > 0 && (
                <div className="py-3 border-b border-white/10 text-xs flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Food & Beverages:</span>
                  <span className="font-medium">
                    {booking.snacks.map((s) => `${s.quantity}x ${s.item.name}`).join(', ')}
                  </span>
                </div>
              )}

              {/* Perforated Divider Bar */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="w-full border-t-2 border-dashed border-white/15" />
                <div className="absolute -left-8 h-6 w-6 rounded-full bg-[#12141f]" />
                <div className="absolute -right-8 h-6 w-6 rounded-full bg-[#12141f]" />
              </div>

              {/* QR Code and Entry Instructions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-4">
                  <QrCodeSvg value={`CINEPASS-${booking.bookingCode}-${booking.movie.id}`} size={90} />
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-white">Scan at Gate #2 Entry Turnstile</p>
                    <p className="text-[11px] text-slate-400">
                      Show this digital pass or downloaded PDF on your phone. No physical printout required.
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Booked for: {booking.customer.fullName} ({booking.customer.phone})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>Print / PDF</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons with explicit CLOSE WINDOW */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={onViewMyBookings}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-xs font-bold text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              <Ticket className="h-4 w-4" />
              <span>View All My Tickets</span>
            </button>

            {/* Explicit CLOSE WINDOW button as requested */}
            <button
              onClick={onCloseWindow}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-rose-600 px-7 py-3 text-xs font-bold text-white shadow-lg shadow-rose-600/30 transition hover:bg-rose-500 active:scale-95"
            >
              <span>Close Window & Done</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
