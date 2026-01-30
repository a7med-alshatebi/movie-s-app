import NavigationLink from "@/app/components/NavigationLink";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "7d8ea17b3a02ac945e53f4753d8e25b0";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

type MovieDetails = {
  id: number;
  title: string;
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
        <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12">
          <p className="text-center text-red-200">Movie not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-950 text-red-50">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12">
        <NavigationLink
          href="/"
          className="text-sm text-red-300 transition hover:text-red-100"
        >
          ← Back to search
        </NavigationLink>

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex-shrink-0">
            {movie.poster_path ? (
              <img
                src={`${POSTER_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-2xl md:w-80"
              />
            ) : (
              <div className="flex h-96 w-full items-center justify-center rounded-2xl bg-white/10 text-red-200 md:w-80">
                No poster
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight">
                {movie.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-red-200">
                <span>{movie.release_date?.split("-")[0] || "N/A"}</span>
                {movie.runtime ? <span>• {movie.runtime} min</span> : null}
                {movie.vote_average ? (
                  <span className="flex items-center gap-1 font-semibold text-yellow-400">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </span>
                ) : null}
              </div>
            </div>

            {movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-red-100"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {movie.overview && (
              <div>
                <h2 className="mb-2 text-lg font-semibold">Overview</h2>
                <p className="leading-7 text-red-200">{movie.overview}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
