import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, Star, Film, Sparkles } from 'lucide-react';
import { Movie, CinemaVenue, ShowDateItem } from '../types/booking';
import { CINEMAS, getAvailableDates } from '../data/mockData';

interface ShowtimePickerModalProps {
  movie: Movie;
  onClose: () => void;
  onSelectShowtime: (selection: {
    movie: Movie;
    cinema: CinemaVenue;
    showDate: ShowDateItem;
    showtime: { id: string; time: string; format: string; language: string; priceMultiplier: number };
  }) => void;
}

export const ShowtimePickerModal: React.FC<ShowtimePickerModalProps> = ({
  movie,
  onClose,
  onSelectShowtime,
}) => {
  const dates = getAvailableDates();
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#12141f] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-8 overflow-hidden rounded bg-slate-800">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-['Syne',sans-serif] text-lg font-bold text-white">
                {movie.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{movie.certificate}</span>
                <span aria-hidden="true">·</span>
                <span>{movie.duration}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-yellow-400">
                  <Star className="h-3 w-3 fill-yellow-400" />
                  {movie.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Step 1: Pick Date */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400 mb-3">
              <Calendar className="h-4 w-4" />
              <span>Select Date</span>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {dates.map((date) => (
                <button
                  key={date.isoDate}
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center justify-center min-w-[90px] rounded-xl p-3 border transition ${
                    selectedDate.isoDate === date.isoDate
                      ? 'border-rose-500 bg-rose-600/20 text-white shadow-sm shadow-rose-950'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-medium">{date.label}</span>
                  <span className="text-sm font-bold text-white mt-0.5">{date.subLabel}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Cinemas & Showtimes */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400 mb-3">
              <Film className="h-4 w-4" />
              <span>Select Cinema & Showtime</span>
            </div>

            <div className="space-y-4">
              {CINEMAS.map((cinema) => (
                <div
                  key={cinema.id}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-3 border-b border-white/5">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        {cinema.name}
                      </h4>
                      <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                        <MapPin className="h-3 w-3 text-slate-500" />
                        <span>{cinema.location}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-500">{cinema.distance}</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mt-2 sm:mt-0 text-[11px] text-slate-400">
                      {cinema.facilities.slice(0, 2).map((f) => (
                        <span key={f} className="rounded bg-white/5 px-2 py-0.5">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Showtimes Grid */}
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {cinema.showtimes.map((st) => (
                      <button
                        key={st.id}
                        onClick={() =>
                          onSelectShowtime({
                            movie,
                            cinema,
                            showDate: selectedDate,
                            showtime: st,
                          })
                        }
                        className="group flex flex-col items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 transition hover:border-rose-500 hover:bg-rose-600/10 active:scale-95"
                      >
                        <span className="text-xs font-bold text-white group-hover:text-rose-400">
                          {st.time}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                          <span>{st.format}</span>
                          <span>·</span>
                          <span>{st.language}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 bg-[#0d0f17] px-6 py-3 flex items-center justify-between text-xs text-slate-400">
          <span>Prices starting at ₹190 • Free cancellation up to 2 hours before show</span>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-300 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
