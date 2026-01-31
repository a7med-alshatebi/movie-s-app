"use client";

import NavigationLink from "./NavigationLink";
import { useWatchlist, type Movie } from "../context/WatchlistContext";

type MovieCardProps = {
  title?: string;
  meta?: string;
  posterUrl?: string;
  rating?: number;
  movieId?: number;
  movie?: Movie;
};

export default function MovieCard({
  title: titleProp,
  meta = "2024",
  posterUrl: posterUrlProp,
  rating: ratingProp,
  movieId: movieIdProp,
  movie,
}: MovieCardProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const movieId = movie?.id ?? movieIdProp;
  const title = movie?.title ?? titleProp ?? "Unknown";
  const posterUrl = movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : posterUrlProp;
  const rating = movie?.vote_average ?? ratingProp;
  const year = movie?.release_date?.split("-")[0] ?? meta;

  const inWatchlist = isInWatchlist(movieId ?? 0);

  const handleWatchlistToggle = () => {
    if (!movieId) return;
    if (inWatchlist) {
      removeFromWatchlist(movieId);
    } else {
      if (movie) {
        addToWatchlist(movie);
      }
    }
  };

  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 sm:gap-4 sm:p-5">
      <div className="flex h-48 items-center justify-center overflow-hidden rounded-xl bg-white/10 text-sm text-red-200 sm:h-56 lg:h-64">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${title} poster`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          "Poster"
        )}
      </div>
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <h2 className="line-clamp-2 text-base font-semibold text-white sm:text-lg">
          {title}
        </h2>
        <div className="flex items-center justify-between">
          <p className="text-xs text-red-200 sm:text-sm">{year}</p>
          {rating ? (
            <p className="text-xs font-semibold text-yellow-400 sm:text-sm">
              ⭐ {rating.toFixed(1)}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex gap-2">
        <NavigationLink
          href={`/movie/${movieId}`}
          className="flex-1 rounded-lg border border-white/10 py-2 text-center text-xs font-medium text-red-100 transition hover:border-white/30 sm:text-sm"
        >
          View details
        </NavigationLink>
        {movie && (
          <button
            onClick={handleWatchlistToggle}
            className={`rounded-lg border py-2 px-3 text-xs font-medium transition sm:text-sm ${
              inWatchlist
                ? "border-yellow-500/50 bg-yellow-500/10 text-yellow-300 hover:border-yellow-500 hover:bg-yellow-500/20"
                : "border-white/10 text-red-100 hover:border-white/30"
            }`}
            aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
          >
            {inWatchlist ? "✓ Added" : "+"}
          </button>
        )}
      </div>
    </article>
  );
}
