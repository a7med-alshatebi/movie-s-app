"use client";

import { useMemo, useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";

type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
};

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "7d8ea17b3a02ac945e53f4753d8e25b0";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

const GENRES = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Romance",
  "Thriller",
  "Animation",
  "Adventure",
  "Fantasy",
];

export default function MovieSearchApp() {
  const [query, setQuery] = useState("");
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
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
        
        setPopularMovies(popularData.results?.slice(0, 12) ?? []);
        setTrendingMovies(trendingData.results?.slice(0, 6) ?? []);
        const topRatedResponse = await fetch(
          `${API_URL}/movie/top_rated?api_key=${API_KEY}`
        );
        const topRatedData = await topRatedResponse.json();
        setTopRatedMovies(topRatedData.results?.slice(0, 6) ?? []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setIsSearched(false);
      return;
    }

    const handler = window.setTimeout(() => {
      handleSearch();
    }, 450);

    return () => window.clearTimeout(handler);
  }, [query]);

  const handleSearch = async () => {
    const trimmed = query.trim();

    if (!trimmed) {
      setSearchResults([]);
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
        setSearchResults([]);
        return;
      }

      setSearchResults(data.results ?? []);
    } catch (err) {
      console.error("Fetch Error:", err);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const featuredMovie = useMemo(
    () => trendingMovies[0] ?? topRatedMovies[0] ?? popularMovies[0],
    [trendingMovies, topRatedMovies, popularMovies]
  );

  const showSearchResults = isSearched && query.trim().length > 0;

  return (
    <section className="flex flex-col gap-6 sm:gap-8">
      <div className="sticky top-0 z-30 -mx-4 bg-red-950/70 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <SearchBar
              value={query}
              onChange={setQuery}
              onSearch={handleSearch}
              isLoading={isLoading}
            />
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-red-100 transition hover:border-white/30"
            aria-label="User profile"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M20 21c0-3.866-3.582-7-8-7s-8 3.134-8 7" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </div>

      {!showSearchResults ? (
        <>
          <section className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 md:col-span-2 md:row-span-2">
              {featuredMovie?.backdrop_path ? (
                <img
                  src={`${BACKDROP_BASE_URL}${featuredMovie.backdrop_path}`}
                  alt={featuredMovie.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-white/5" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-red-950/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-red-200">
                  Featured movie of the day
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                  {featuredMovie?.title ?? "Discover the best of TMDB"}
                </h2>
                <p className="mt-2 text-sm text-red-200">
                  {featuredMovie?.release_date?.split("-")[0] || ""}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-red-200">
                Trending now
              </p>
              <div className="mt-4 space-y-3">
                {trendingMovies.slice(0, 3).map((movie) => (
                  <div key={movie.id} className="flex items-center gap-3">
                    <div className="h-12 w-9 rounded-lg bg-white/10" />
                    <div>
                      <p className="text-sm text-white line-clamp-1">
                        {movie.title}
                      </p>
                      <p className="text-xs text-red-200">
                        {movie.release_date?.split("-")[0] || "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-red-200">
                Top rated
              </p>
              <div className="mt-4 space-y-3">
                {topRatedMovies.slice(0, 3).map((movie) => (
                  <div key={movie.id} className="flex items-center gap-3">
                    <div className="h-12 w-9 rounded-lg bg-white/10" />
                    <div>
                      <p className="text-sm text-white line-clamp-1">
                        {movie.title}
                      </p>
                      <p className="text-xs text-red-200">
                        ⭐ {movie.vote_average.toFixed(1)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="sticky top-14 z-20 -mx-4 border-y border-white/10 bg-red-950/80 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {GENRES.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-red-100 transition hover:border-white/30"
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-white sm:mb-4 sm:text-xl">
              Popular movies
            </h2>
            <section className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {popularMovies.map((movie) => (
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
          <section className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="h-72 rounded-2xl border border-white/10 bg-white/5 animate-pulse"
                  />
                ))
              : searchResults.map((movie) => (
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
