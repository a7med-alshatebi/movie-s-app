import MovieSearchApp from "./components/MovieSearchApp";

export default function Home() {
  return (
    <div className="min-h-screen bg-red-950 text-red-50">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-12 lg:px-8">
        <header className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-300 sm:text-sm">
            Movie Search
          </p>
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Discover movies you love
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-red-200 sm:text-base sm:leading-7">
              Search the latest hits, explore trending favorites, and open full
              details in a single click.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-red-200 sm:text-sm">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Fast search
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Trending lists
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Detailed pages
            </span>
          </div>
        </header>

        <MovieSearchApp />
      </main>
    </div>
  );
}
