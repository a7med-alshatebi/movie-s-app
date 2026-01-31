import MovieSearchApp from "./components/MovieSearchApp";

export default function Home() {
  return (
    <div className="min-h-screen bg-red-950 text-red-50">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-12 lg:px-8">
        <header className="flex flex-col gap-3 sm:gap-4 bg-black/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
          <p className="tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs font-semibold opacity-70">
            Movie Search
          </p>
          <div className="flex flex-col gap-2 sm:gap-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight sm:tracking-tighter">
              Discover movies you love
            </h1>
            <p className="max-w-2xl text-sm sm:text-base text-slate-400 leading-relaxed">
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
