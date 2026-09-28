import React, { useEffect } from 'react';
import { X, ExternalLink, Ticket, Film, Play } from 'lucide-react';
import { Movie } from '../types/booking';

interface TrailerModalProps {
  movie: Movie;
  onClose: () => void;
  onBookTickets: (movie: Movie) => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({
  movie,
  onClose,
  onBookTickets,
}) => {
  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleOpenDirectYouTube = () => {
    window.open(movie.trailerUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-md">
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#10121b] shadow-2xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 bg-[#0a0b10]">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white shadow-md shadow-red-900/40">
              <Play className="h-4 w-4 fill-white ml-0.5" />
            </div>
            <div>
              <h3 className="font-['Syne',sans-serif] text-base font-bold text-white flex items-center gap-2">
                <span>{movie.title}</span>
                <span className="text-xs font-normal text-slate-400">— Official Theatrical Trailer</span>
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{movie.certificate}</span>
                <span aria-hidden="true">·</span>
                <span>{movie.duration}</span>
                <span aria-hidden="true">·</span>
                <span className="text-rose-400 font-semibold">{movie.languages.join(', ')}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct YouTube Button in Header */}
            <button
              onClick={handleOpenDirectYouTube}
              className="flex items-center gap-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 px-3 py-1.5 text-xs font-bold text-white transition active:scale-95 shadow-md shadow-red-900/30"
              title="Open direct trailer in YouTube"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Watch on YouTube</span>
            </button>

            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition"
              aria-label="Close trailer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${movie.trailerYoutubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={`${movie.title} Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>

        {/* Footer with Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-white/10 bg-[#0d0f17] px-5 py-3.5 text-xs">
          <div className="flex items-center gap-3 text-slate-300">
            <span className="font-medium text-white">{movie.director}</span>
            <span aria-hidden="true" className="text-white/20">|</span>
            <span className="text-slate-400 truncate max-w-[280px] sm:max-w-md">
              Starring: {movie.cast.join(', ')}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleOpenDirectYouTube}
              className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-950/30 hover:bg-red-900/50 text-red-200 px-3.5 py-2 text-xs font-semibold transition"
            >
              <ExternalLink className="h-3.5 w-3.5 text-red-400" />
              <span>Direct YouTube Link</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onBookTickets(movie);
              }}
              className="flex items-center gap-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-rose-600/30 transition active:scale-95"
            >
              <Ticket className="h-3.5 w-3.5" />
              <span>Book Tickets</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
