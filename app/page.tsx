import MovieSearchApp from "./components/MovieSearchApp";

export default function Home() {
  return (
    <div className="min-h-screen bg-red-950 text-red-50">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-12 lg:px-8">
        <header className="flex flex-col gap-2 sm:gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-red-300 sm:text-sm">
            Movie Search
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Find movies fast
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-red-200 sm:text-base sm:leading-7">
            Search for any title and get clean, focused results.
          </p>
        </header>

        <MovieSearchApp />
      </main>
    </div>
  );
}
