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
const API_KEY = "7d8ea17b3a02ac945e53f4753d8e25b0";

export default function MovieSearchApp() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    const trimmed = query.trim();

    if (!trimmed) {
      setMovies([]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(trimmed)}`
      );
      const data = await response.json();

      if (data.Response === "False") {
        setMovies([]);
        return;
      }

      setMovies(data.Search ?? []);
    } catch (err) {
      console.error(err);
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

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
