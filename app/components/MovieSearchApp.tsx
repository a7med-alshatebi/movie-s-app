"use client";

import { useState } from "react";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
};

const API_URL = "https://www.omdbapi.com/";
const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY ?? "7d8ea17b3a02ac945e53f4753d8e25b0";

export default function MovieSearchApp() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const trimmed = query.trim();

    if (!trimmed) {
      setError("Enter a movie title to search.");
      setMovies([]);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(trimmed)}`
      );
      const data = await response.json();

      if (data.Response === "False") {
        setMovies([]);
        setError(data.Error ?? "No results found.");
        return;
      }

      setMovies(data.Search ?? []);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-8">
      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {error ? (
        <p className="rounded-xl border border-red-300/20 bg-red-900/20 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {movies.length === 0 && !error ? (
          <div className="col-span-full rounded-xl border border-white/10 bg-white/5 px-4 py-10 text-center text-sm text-red-200">
            Search for a movie to see results.
          </div>
        ) : null}

        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            meta={`${movie.Year} · ${movie.Type}`}
            posterUrl={movie.Poster !== "N/A" ? movie.Poster : undefined}
          />
        ))}
      </section>
    </section>
  );
}
