import React, { useState } from 'react';
import { Ticket, MapPin, ChevronDown } from 'lucide-react';
import { CITIES } from '../data/mockData';

interface HeaderProps {
  currentCity: string;
  onSelectCity: (city: string) => void;
  bookingCount: number;
  onOpenMyBookings: () => void;
  activeNav: string;
  onSelectNav: (nav: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCity,
  onSelectCity,
  bookingCount,
  onOpenMyBookings,
  activeNav,
  onSelectNav,
}) => {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0b0c10]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectNav('movies')}
          className="group flex items-center gap-2 text-left focus-visible:outline-none"
        >
          <span className="font-['Syne',sans-serif] text-2xl font-extrabold tracking-tight text-white transition group-hover:text-rose-400">
            Cine<span className="text-rose-500">Pass</span>
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden items-center gap-8 md:flex">
          <button
            onClick={() => onSelectNav('movies')}
            className={`text-sm font-medium transition-colors hover:text-white ${
              activeNav === 'movies' ? 'text-rose-500' : 'text-slate-300'
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => onSelectNav('theaters')}
            className={`text-sm font-medium transition-colors hover:text-white ${
              activeNav === 'theaters' ? 'text-rose-500' : 'text-slate-300'
            }`}
          >
            Cinemas
          </button>
          <button
            onClick={() => onSelectNav('experiences')}
            className={`text-sm font-medium transition-colors hover:text-white ${
              activeNav === 'experiences' ? 'text-rose-500' : 'text-slate-300'
            }`}
          >
            Experiences
          </button>
          <button
            onClick={() => onSelectNav('snacks')}
            className={`text-sm font-medium transition-colors hover:text-white ${
              activeNav === 'snacks' ? 'text-rose-500' : 'text-slate-300'
            }`}
          >
            Gourmet
          </button>
          <button
            onClick={onOpenMyBookings}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            <span>My Bookings</span>
            {bookingCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[11px] font-bold text-white tabular-nums">
                {bookingCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* City Selector */}
          <div className="relative">
            <button
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-white/10"
              aria-label="Select City"
            >
              <MapPin className="h-3.5 w-3.5 text-rose-400" />
              <span className="max-w-[85px] truncate sm:max-w-none">{currentCity}</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            {cityDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setCityDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 z-50 w-44 rounded-xl border border-white/10 bg-[#161821] p-1.5 shadow-2xl shadow-black/80">
                  <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Select Region
                  </div>
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        onSelectCity(city);
                        setCityDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-left transition ${
                        currentCity === city
                          ? 'bg-rose-500/20 font-semibold text-rose-400'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span>{city}</span>
                      {currentCity === city && <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Bookings Direct Action Button */}
          <button
            onClick={onOpenMyBookings}
            className="flex items-center gap-2 rounded-lg bg-rose-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm shadow-rose-900/40 transition hover:bg-rose-500 active:scale-95"
          >
            <Ticket className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">My Tickets</span>
            {bookingCount > 0 && (
              <span className="rounded bg-rose-900/80 px-1.5 py-0.2 text-[10px] tabular-nums">
                {bookingCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
