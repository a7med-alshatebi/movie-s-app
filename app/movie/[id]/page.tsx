import NavigationLink from "@/app/components/NavigationLink";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "7d8ea17b3a02ac945e53f4753d8e25b0";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

type MovieDetails = {
  id: number;
  title: string;
  tagline: string;
  status: string;
  original_language: string;
  homepage: string | null;
  budget: number;
  revenue: number;
  production_countries: { iso_3166_1: string; name: string }[];
  spoken_languages: { english_name: string; name: string }[];
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
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

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

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

  return (
    <div className="min-h-screen bg-red-950 text-red-50">
      <div className="relative overflow-hidden">
        {movie.backdrop_path ? (
          <div className="absolute inset-0">
            <img
              src={`${POSTER_BASE_URL.replace("w500", "w1280")}${movie.backdrop_path}`}
              alt=""
              className="h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 via-red-950/80 to-red-950" />
          </div>
        ) : null}

        <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-12 lg:gap-10 lg:px-8">
          <NavigationLink
            href="/"
            className="text-xs text-red-200 transition hover:text-red-50 sm:text-sm"
          >
            ← Back to search
          </NavigationLink>

          <div className="flex flex-col gap-6 sm:gap-8 md:flex-row">
            <div className="flex-shrink-0">
              {movie.poster_path ? (
                <img
                  src={`${POSTER_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full max-w-[240px] rounded-3xl border border-white/10 shadow-2xl shadow-red-500/20 sm:max-w-sm md:w-72 lg:w-80"
                />
              ) : (
                <div className="flex h-80 w-full items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-red-200 sm:max-w-sm md:h-[28rem] md:w-72 lg:h-[30rem] lg:w-80">
                  No poster
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-red-500/10 backdrop-blur sm:p-6">
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                  {movie.title}
                </h1>
                {movie.tagline ? (
                  <p className="mt-2 text-sm italic text-red-200 sm:text-base">
                    “{movie.tagline}”
                  </p>
                ) : null}
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-red-200 sm:gap-4 sm:text-sm">
                  <span>{movie.release_date?.split("-")[0] || "N/A"}</span>
                  {movie.runtime ? <span>• {movie.runtime} min</span> : null}
                  {movie.vote_average ? (
                    <span className="flex items-center gap-1 font-semibold text-yellow-400">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </span>
                  ) : null}
                </div>

                {movie.genres.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-red-100 sm:text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {movie.overview && (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-red-500/10 backdrop-blur sm:p-6">
                  <h2 className="mb-2 text-base font-semibold sm:text-lg">
                    Overview
                  </h2>
                  <p className="text-sm leading-6 text-red-200 sm:text-base sm:leading-7">
                    {movie.overview}
                  </p>
                </div>
              )}

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-red-500/10 backdrop-blur sm:p-6">
                <h2 className="mb-4 text-base font-semibold sm:text-lg">
                  Quick facts
                </h2>
                <div className="grid gap-3 text-sm text-red-200 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-red-300">
                      Release date
                    </p>
                    <p className="mt-1 text-sm text-red-100">
                      {movie.release_date || "N/A"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-red-300">
                      Status
                    </p>
                    <p className="mt-1 text-sm text-red-100">
                      {movie.status || "N/A"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-red-300">
                      Language
                    </p>
                    <p className="mt-1 text-sm text-red-100">
                      {movie.original_language?.toUpperCase() || "N/A"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-red-300">
                      Countries
                    </p>
                    <p className="mt-1 text-sm text-red-100">
                      {movie.production_countries?.length
                        ? movie.production_countries.map((c) => c.name).join(", ")
                        : "N/A"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-red-300">
                      Runtime
                    </p>
                    <p className="mt-1 text-sm text-red-100">
                      {movie.runtime ? `${movie.runtime} min` : "N/A"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-red-300">
                      Rating
                    </p>
                    <p className="mt-1 text-sm text-red-100">
                      {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-red-300">
                      Budget
                    </p>
                    <p className="mt-1 text-sm text-red-100">
                      {movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-red-300">
                      Revenue
                    </p>
                    <p className="mt-1 text-sm text-red-100">
                      {movie.revenue ? `$${movie.revenue.toLocaleString()}` : "N/A"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 sm:col-span-2">
                    <p className="text-xs uppercase tracking-widest text-red-300">
                      Spoken languages
                    </p>
                    <p className="mt-1 text-sm text-red-100">
                      {movie.spoken_languages?.length
                        ? movie.spoken_languages
                            .map((lang) => lang.english_name || lang.name)
                            .join(", ")
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {movie.homepage ? (
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-red-100 transition hover:border-white/30 sm:text-sm"
                  >
                    Visit official site
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
