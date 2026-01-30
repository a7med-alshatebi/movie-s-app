import MovieSearchApp from "./components/MovieSearchApp";

export default function Home() {
  return (
    <div className="min-h-screen bg-red-950 text-red-50">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,63,94,0.25),_transparent_60%)]" />
        <div className="pointer-events-none absolute -right-24 top-24 h-64 w-64 rounded-full bg-red-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />

        <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-12 lg:px-8">
          <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-red-500/10 backdrop-blur sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-red-200">
                Movie Search
              </span>
              <span className="text-xs text-red-300">Powered by TMDB</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Find movies fast with a cinematic touch
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-red-200 sm:text-base sm:leading-7">
              Discover trending titles, explore popular picks, and jump into
              detailed views without leaving the flow.
            </p>

            <div className="flex flex-wrap gap-3 text-xs text-red-200 sm:text-sm">
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Instant search
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Trending picks
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Detailed pages
              </div>
            </div>
          </header>

          <MovieSearchApp />
        </main>
      </div>
    </div>
  );
}
