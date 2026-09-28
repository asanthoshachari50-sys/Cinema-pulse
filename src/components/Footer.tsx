import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC<{ onOpenMyBookings: () => void; onNavigateMovies: () => void }> = ({
  onOpenMyBookings,
  onNavigateMovies,
}) => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#08090d] text-slate-400 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 pb-8 border-b border-white/5">
          <div className="md:col-span-2 space-y-3">
            <span className="font-['Syne',sans-serif] text-xl font-extrabold text-white">
              Cine<span className="text-rose-500">Pass</span>
            </span>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Real-time movie ticket reservations, live theater seating selection, instant payment confirmation, and contact-free admission passes.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 pt-1">
              <ShieldCheck className="h-4 w-4" />
              <span>Certified 256-Bit SSL Encrypted Ticketing</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onNavigateMovies} className="hover:text-white transition">
                  Now Showing
                </button>
              </li>
              <li>
                <button onClick={onNavigateMovies} className="hover:text-white transition">
                  Upcoming Blockbusters
                </button>
              </li>
              <li>
                <button onClick={onOpenMyBookings} className="hover:text-white transition">
                  My Booked Tickets
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-slate-400">24/7 Cinema Concierge</span>
              </li>
              <li>
                <span className="text-slate-400">Instant Seat Cancellation</span>
              </li>
              <li>
                <span className="text-slate-400">Terms of Ticketing Service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} CinePass Entertainment Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Use</span>
            <span aria-hidden="true">·</span>
            <span>Ticket Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
