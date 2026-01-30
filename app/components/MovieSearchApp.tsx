"use client";

import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";

type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  vote_average: number;
};

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "7d8ea17b3a02ac945e53f4753d8e25b0";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieSearchApp() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [popularResponse, trendingResponse] = await Promise.all([
          fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`),
          fetch(`${API_URL}/trending/movie/week?api_key=${API_KEY}`)
        ]);
        
        const popularData = await popularResponse.json();
        const trendingData = await trendingResponse.json();
        
        setMovies(popularData.results?.slice(0, 12) ?? []);
        setTrendingMovies(trendingData.results?.slice(0, 6) ?? []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = async () => {
    const trimmed = query.trim();

    if (!trimmed) {
      setMovies([]);
      return;
    }

    setIsLoading(true);
    setIsSearched(true);

    try {
      const url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(trimmed)}`;
      console.log("Fetching from:", url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log("API Response:", data);
      console.log("Response Status:", response.status);

      if (!data.results || data.results.length === 0) {
        console.log("No results found");
        setMovies([]);
        return;
      }

      setMovies(data.results ?? []);
    } catch (err) {
      console.error("Fetch Error:", err);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-6 sm:gap-8">
      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {!isSearched ? (
        <>
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white sm:mb-4 sm:text-xl">
              Trending this week
            </h2>
            <section className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {trendingMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movieId={movie.id}
                  title={movie.title}
                  meta={movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
                  posterUrl={movie.poster_path ? `${POSTER_BASE_URL}${movie.poster_path}` : undefined}
                  rating={movie.vote_average}
                />
              ))}
            </section>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-white sm:mb-4 sm:text-xl">
              Popular movies
            </h2>
            <section className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movieId={movie.id}
                  title={movie.title}
                  meta={movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
                  posterUrl={movie.poster_path ? `${POSTER_BASE_URL}${movie.poster_path}` : undefined}
                  rating={movie.vote_average}
                />
              ))}
            </section>
          </div>
        </>
      ) : (
        <>
          <p className="text-xs text-red-300 sm:text-sm">
            Search results for "{query}"
          </p>
          <section className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movieId={movie.id}
                title={movie.title}
                meta={movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
                posterUrl={movie.poster_path ? `${POSTER_BASE_URL}${movie.poster_path}` : undefined}
                rating={movie.vote_average}
              />
            ))}
          </section>
        </>
      )}
    </section>
  );
}
