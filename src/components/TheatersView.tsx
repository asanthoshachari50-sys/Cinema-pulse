import React from 'react';
import { MapPin, Sparkles, Volume2, ShieldCheck, Ticket } from 'lucide-react';
import { CINEMAS } from '../data/mockData';

interface TheatersViewProps {
  onSelectCinemaForBooking: (cinemaId: string) => void;
}

export const TheatersView: React.FC<TheatersViewProps> = ({ onSelectCinemaForBooking }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="border-b border-white/10 pb-6 mb-8">
        <h2 className="font-['Syne',sans-serif] text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Partner Cinemas & Multiplexes
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          State-of-the-art IMAX with Laser, 4DX motion simulators, and Dolby Atmos audio sanctuaries.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {CINEMAS.map((cinema) => (
          <div
            key={cinema.id}
            className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#12141e] p-5 transition-all duration-300 hover:border-white/25 hover:shadow-xl hover:shadow-rose-950/20"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                  Multiplex Destination
                </span>
                <span className="text-[11px] text-slate-400">{cinema.distance}</span>
              </div>

              <h3 className="mt-3 font-['Syne',sans-serif] text-lg font-bold text-white group-hover:text-rose-400 transition">
                {cinema.name}
              </h3>

              <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                <MapPin className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                <span>{cinema.location}</span>
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {cinema.facilities.map((fac) => (
                  <span
                    key={fac}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-300"
                  >
                    {fac}
                  </span>
                ))}
              </div>

              <div className="mt-4 space-y-1.5 text-xs text-slate-400">
                <div className="text-[11px] font-semibold text-slate-300">Today's Formats Available:</div>
                <div className="flex items-center gap-2 text-rose-400 font-medium">
                  {cinema.showtimes.map((st) => st.format).filter((v, i, a) => a.indexOf(v) === i).join(' · ')}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-400">Starting at ₹190</span>
              <button
                onClick={() => onSelectCinemaForBooking(cinema.id)}
                className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-600 hover:text-white"
              >
                <Ticket className="h-3.5 w-3.5" />
                <span>Check Shows</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
