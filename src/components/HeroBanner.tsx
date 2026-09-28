import React, { useState } from 'react';
import { Star, Play, Sparkles, Clock, ShieldCheck, X, ExternalLink } from 'lucide-react';
import { Movie } from '../types/booking';
import { TrailerModal } from './TrailerModal';

interface HeroBannerProps {
  movie: Movie;
  onBookNow: (movie: Movie) => void;
  onWatchTrailer?: (movie: Movie) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ movie, onBookNow, onWatchTrailer }) => {
  const [showTrailerModal, setShowTrailerModal] = useState(false);

  const handleTrailerClick = () => {
    if (onWatchTrailer) {
      onWatchTrailer(movie);
    } else {
      setShowTrailerModal(true);
    }
  };

  return (
    <div className="relative w-full overflow-hidden border-b border-white/10 bg-[#0d0f17]">
      {/* Background with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center opacity-40 brightness-75 filter transition-all duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10] via-[#0b0c10]/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Main movie details */}
          <div className="lg:col-span-8 space-y-4">
            {/* Unboxed metadata line */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-rose-400">
              <span className="flex items-center gap-1 font-semibold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                Featured Premiere
              </span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span className="text-slate-300">{movie.certificate}</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span className="flex items-center gap-1 text-slate-300">
                <Clock className="h-3.5 w-3.5" />
                {movie.duration}
              </span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span className="text-slate-300">{movie.genre.join(', ')}</span>
            </div>

            <h1 className="font-['Syne',sans-serif] text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl max-w-3xl leading-tight">
              {movie.title}
            </h1>

            {/* Rating & formats */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1 text-yellow-400 font-semibold tabular-nums">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{movie.rating.toFixed(1)}/10</span>
                <span className="text-xs text-yellow-400/70 font-normal">({movie.votesCount} votes)</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300">
                {movie.formats.map((fmt, idx) => (
                  <span key={fmt} className="rounded bg-white/10 px-2 py-0.5 font-medium text-slate-200">
                    {fmt}
                  </span>
                ))}
              </div>
            </div>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-300 line-clamp-3">
              {movie.synopsis}
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-slate-200 font-medium">Starring:</span>
              <span>{movie.cast.join(' · ')}</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onBookNow(movie)}
                className="flex items-center gap-2 rounded-xl bg-rose-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-rose-600/30 transition hover:bg-rose-500 hover:shadow-rose-600/50 active:scale-95"
              >
                <span>Book Tickets</span>
              </button>

              <button
                onClick={handleTrailerClick}
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
              >
                <Play className="h-4 w-4 fill-white" />
                <span>Watch Trailer</span>
              </button>
            </div>
          </div>

          {/* Side Poster Card for Desktop */}
          <div className="hidden lg:col-span-4 lg:flex lg:justify-end">
            <div className="group relative w-64 overflow-hidden rounded-2xl border border-white/15 bg-slate-900 shadow-2xl transition duration-500 hover:-translate-y-1.5 hover:shadow-rose-950/40">
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 bg-gradient-to-t from-[#10121a] to-transparent">
                <div className="text-xs text-slate-400">Directed by</div>
                <div className="text-sm font-semibold text-white">{movie.director}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailerModal && (
        <TrailerModal
          movie={movie}
          onClose={() => setShowTrailerModal(false)}
          onBookTickets={onBookNow}
        />
      )}
    </div>
  );
};
