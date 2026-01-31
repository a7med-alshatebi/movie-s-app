"use client";

import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";
import Link from "next/link";

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();

  return (
    <div className="min-h-screen bg-red-950 text-red-50">
      {/* Sticky Header with Back Button */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-red-950/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-red-100 transition hover:border-white/30 hover:bg-white/10"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter">
              My Watchlist
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {watchlist.length} {watchlist.length === 1 ? "movie" : "movies"}
            </p>
          </div>
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-12 lg:px-8">
        {watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-8 rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-white/2 py-20 px-6 sm:py-28 text-center">
            <div className="text-8xl sm:text-9xl opacity-80">📽️</div>
            <div className="flex flex-col gap-3 max-w-md">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tighter">Your watchlist is empty</h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Start exploring movies and add them to your watchlist to keep track of what you want to watch.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-red-600 to-red-700 px-8 py-3 font-semibold text-white shadow-lg shadow-red-600/30 transition active:scale-95 hover:shadow-lg hover:shadow-red-600/50"
            >
              <span>🔍</span>
              <span>Explore Movies</span>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                  Saved Movies
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Click the checkmark on any movie to remove it from your watchlist
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {watchlist.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
