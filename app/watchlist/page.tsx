"use client";

import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";
import Link from "next/link";

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();

  return (
    <div className="min-h-screen bg-red-950 text-red-50">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-12 lg:px-8">
        <header className="flex flex-col gap-4">
          <Link href="/" className="text-red-300 hover:text-red-200 text-sm">
            ← Back to search
          </Link>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter">
              My Watchlist
            </h1>
            <p className="max-w-2xl text-sm sm:text-base text-slate-400 leading-relaxed">
              {watchlist.length === 0
                ? "Your watchlist is empty. Start adding movies to keep track of what you want to watch!"
                : `You have ${watchlist.length} movie${watchlist.length !== 1 ? "s" : ""} in your watchlist`}
            </p>
          </div>
        </header>

        {watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-white/10 bg-white/5 py-16 px-8 text-center">
            <div className="text-6xl">📽️</div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">No movies added yet</h2>
              <p className="text-red-200 mb-6">
                Search for movies and add them to your watchlist to get started
              </p>
              <Link
                href="/"
                className="inline-block rounded-full bg-red-600 px-6 py-2 font-semibold text-white hover:bg-red-700 transition"
              >
                Search Movies
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
