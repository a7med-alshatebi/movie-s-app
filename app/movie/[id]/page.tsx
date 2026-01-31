"use client";

import { useState, useEffect } from "react";
import NavigationLink from "@/app/components/NavigationLink";
import MovieCard from "@/app/components/MovieCard";
import { useWatchlist, type Movie } from "@/app/context/WatchlistContext";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "7d8ea17b3a02ac945e53f4753d8e25b0";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

type MovieDetails = {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
};

type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

type Video = {
  id: string;
  key: string;
  site: string;
  type: string;
};

type SimilarMovie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
};

async function getMovieDetails(id: string): Promise<MovieDetails | null> {
  try {
    const response = await fetch(
      `${API_URL}/movie/${id}?api_key=${API_KEY}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
}

async function getMovieCredits(id: string): Promise<CastMember[]> {
  try {
    const response = await fetch(
      `${API_URL}/movie/${id}/credits?api_key=${API_KEY}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    return data.cast?.slice(0, 12) ?? [];
  } catch (error) {
    console.error("Error fetching credits:", error);
    return [];
  }
}

async function getMovieVideos(id: string): Promise<Video[]> {
  try {
    const response = await fetch(
      `${API_URL}/movie/${id}/videos?api_key=${API_KEY}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    return data.results ?? [];
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

async function getSimilarMovies(id: string): Promise<SimilarMovie[]> {
  try {
    const response = await fetch(
      `${API_URL}/movie/${id}/similar?api_key=${API_KEY}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    return data.results?.slice(0, 8) ?? [];
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    return [];
  }
}

export default function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string | null>(null);
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  // Get the ID from params
  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  // Fetch movie data when ID is available
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      const [movieData, castData, videosData, similarData] = await Promise.all([
        getMovieDetails(id),
        getMovieCredits(id),
        getMovieVideos(id),
        getSimilarMovies(id),
      ]);
      setMovie(movieData);
      setCast(castData);
      setVideos(videosData);
      setSimilarMovies(similarData);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleWatchlistToggle = () => {
    if (!movie) return;
    
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      const movieToAdd: Movie = {
        id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average,
      };
      addToWatchlist(movieToAdd);
    }
  };

  const trailer = videos.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-red-950 text-red-50">
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-12 lg:gap-10 lg:px-8">
          <p className="text-center text-sm text-red-200 sm:text-base">
            Loading movie details...
          </p>
        </main>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-red-950 text-red-50">
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-12 lg:gap-10 lg:px-8">
          <p className="text-center text-sm text-red-200 sm:text-base">
            Movie not found
          </p>
        </main>
      </div>
    );
  }

  const inWatchlist = isInWatchlist(movie.id);

  return (
    <div className="min-h-screen bg-red-950 text-red-50">
      <div className="relative h-[50vh] min-h-90 w-full">
        {movie.backdrop_path ? (
          <img
            src={`${BACKDROP_BASE_URL}${movie.backdrop_path}`}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-white/5" />
        )}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-red-950/40 to-red-950" />
        <NavigationLink
          href="/"
          className="fixed left-4 top-4 z-50 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-sm text-red-100 shadow-md shadow-black/30 backdrop-blur transition hover:border-white/30 hover:bg-white/10 sm:left-6 sm:top-6"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </NavigationLink>
      </div>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="-mt-24 flex justify-center sm:-mt-28 lg:justify-start">
            {movie.poster_path ? (
              <img
                src={`${POSTER_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full max-w-60 rounded-3xl shadow-2xl shadow-black/40 sm:max-w-sm lg:max-w-none"
              />
            ) : (
              <div className="flex h-80 w-full items-center justify-center rounded-3xl bg-white/10 text-red-200 sm:max-w-sm">
                No poster
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {movie.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-red-200 sm:text-sm">
                <span>{movie.release_date?.split("-")[0] || "N/A"}</span>
                <span>•</span>
                <span>{movie.runtime ? `${movie.runtime} min` : "N/A"}</span>
                <span>•</span>
                <span className="font-semibold text-yellow-400">
                  ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                </span>
              </div>
              {movie.tagline ? (
                <p className="mt-3 text-sm italic text-red-200 sm:text-base">
                  “{movie.tagline}”
                </p>
              ) : null}
            </div>

            {movie.overview && (
              <div>
                <h2 className="mb-2 text-base font-semibold sm:text-lg">Overview</h2>
                <p className="text-sm leading-6 text-red-200 sm:text-base sm:leading-7">
                  {movie.overview}
                </p>
              </div>
            )}

            {movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-red-100 sm:text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {trailer ? (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-red-500 px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-red-500/30 transition active:scale-95 sm:text-sm"
                >
                  Watch Trailer
                </a>
              ) : null}
              <button
                onClick={handleWatchlistToggle}
                type="button"
                className={`rounded-full px-5 py-3 text-xs font-semibold transition active:scale-95 sm:text-sm ${
                  inWatchlist
                    ? "border border-yellow-500/50 bg-yellow-500/10 text-yellow-300 shadow-lg shadow-yellow-500/20 hover:border-yellow-500 hover:bg-yellow-500/20"
                    : "border border-white/10 bg-white/10 text-red-100 hover:border-white/30 hover:bg-white/20"
                }`}
              >
                {inWatchlist ? "✓ In Watchlist" : "+ Add to Watchlist"}
              </button>
              <button
                type="button"
                className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-xs font-semibold text-red-100 transition active:scale-95 sm:text-sm"
              >
                Share
              </button>
            </div>
          </div>
        </section>

        {cast.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-white">Cast & Crew</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {cast.map((member) => (
                <div key={member.id} className="flex w-24 flex-col items-center gap-2">
                  <div className="aspect-square w-20 overflow-hidden rounded-full bg-white/10">
                    {member.profile_path ? (
                      <img
                        src={`${POSTER_BASE_URL}${member.profile_path}`}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <p className="text-center text-xs text-red-100 line-clamp-2">
                    {member.name}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {similarMovies.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-white">Similar movies</h2>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {similarMovies.map((movieItem) => (
                <MovieCard
                  key={movieItem.id}
                  movie={movieItem}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
