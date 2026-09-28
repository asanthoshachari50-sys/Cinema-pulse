import React, { useState } from 'react';
import { Star, Search, Filter, Clock, Film } from 'lucide-react';
import { Movie } from '../types/booking';

interface MovieCatalogProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

export const MovieCatalog: React.FC<MovieCatalogProps> = ({ movies, onSelectMovie }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');

  const languages = ['All', 'Telugu', 'Hindi', 'English'];
  const genres = ['All', 'Action', 'Sci-Fi', 'Thriller', 'Drama', 'Period'];
  const formats = ['All', 'IMAX 2D', 'IMAX 3D', '4DX', 'Dolby Atmos'];

  const filteredMovies = movies.filter((movie) => {
    const matchesLanguage =
      selectedLanguage === 'All' || movie.languages.includes(selectedLanguage);
    const matchesGenre =
      selectedGenre === 'All' || movie.genre.includes(selectedGenre);
    const matchesSearch =
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.cast.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      movie.director.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat =
      selectedFormat === 'All' || movie.formats.includes(selectedFormat);

    return matchesLanguage && matchesGenre && matchesSearch && matchesFormat;
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Controls Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-['Syne',sans-serif] text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Now Showing in Theaters
            </h2>
            <span className="rounded bg-rose-600/20 border border-rose-500/30 text-[11px] font-bold text-rose-400 px-2.5 py-0.5 uppercase tracking-wider">
              Tollywood & Global Hits
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Experience recent Telugu blockbusters, pan-India epics, and worldwide premieres with live seat reservation
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Devara, Pushpa, Kalki, Prabhas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/5 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-400 focus:border-rose-500 focus:bg-white/10 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Language filter row with highlight on Telugu */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        {/* Language Tabs */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Language:</span>
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`relative rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  selectedLanguage === lang
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-950'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{lang}</span>
                {lang === 'Telugu' && (
                  <span className="ml-1.5 rounded bg-amber-400/20 text-amber-300 text-[10px] px-1.5 py-0.2 font-bold uppercase">
                    Hot
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Format tabs */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 hidden sm:inline font-semibold uppercase tracking-wider">Format:</span>
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
            {formats.map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition ${
                  selectedFormat === fmt
                    ? 'bg-white/15 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Genre tabs */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <span className="text-xs text-slate-400 mr-1 font-semibold uppercase tracking-wider">Genre:</span>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`rounded-lg px-3 py-1 text-xs font-medium transition ${
              selectedGenre === genre
                ? 'bg-white/20 text-white border border-white/30'
                : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Movies Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#12141e] transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-xl hover:shadow-rose-950/20"
          >
            {/* Poster Image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12141e] via-transparent to-transparent opacity-80" />

              {/* Rating overlay badge */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-md bg-black/75 backdrop-blur-md px-2 py-0.5 text-xs font-semibold text-yellow-400">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="tabular-nums">{movie.rating.toFixed(1)}</span>
                <span className="text-[10px] text-slate-300 font-normal">({movie.votesCount})</span>
              </div>

              {/* Telugu flag tag if telugu */}
              {movie.languages.includes('Telugu') && (
                <div className="absolute top-3 left-3 rounded bg-rose-600/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                  Telugu
                </div>
              )}

              {/* Certificate */}
              <div className="absolute top-3 right-3 rounded bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-slate-200">
                {movie.certificate}
              </div>
            </div>

            {/* Info Body */}
            <div className="flex flex-1 flex-col justify-between p-4">
              <div>
                {/* Clean unboxed metadata */}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span>{movie.genre[0]}</span>
                  <span aria-hidden="true">·</span>
                  <span>{movie.duration}</span>
                  <span aria-hidden="true">·</span>
                  <span>{movie.languages.slice(0, 2).join(', ')}</span>
                </div>

                <h3 className="mt-1 font-['Syne',sans-serif] text-base font-bold text-white transition group-hover:text-rose-400 line-clamp-1">
                  {movie.title}
                </h3>

                <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {movie.synopsis}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-wrap gap-1 text-[10px] text-slate-300">
                  {movie.formats.slice(0, 2).map((f) => (
                    <span key={f} className="rounded bg-white/5 px-1.5 py-0.5">
                      {f}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onSelectMovie(movie)}
                  className="rounded-lg bg-rose-600 px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-rose-500 active:scale-95 shadow-sm shadow-rose-900/40"
                >
                  Book Seats
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <div className="my-16 flex flex-col items-center justify-center text-center">
          <Film className="h-12 w-12 text-slate-600 mb-3" />
          <h4 className="text-base font-semibold text-slate-300">No movies found</h4>
          <p className="text-xs text-slate-500 max-w-sm mt-1">
            Try adjusting your search query or selecting a different genre filter.
          </p>
          <button
            onClick={() => {
              setSelectedGenre('All');
              setSelectedFormat('All');
              setSearchQuery('');
            }}
            className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-xs font-medium text-white hover:bg-white/15"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
