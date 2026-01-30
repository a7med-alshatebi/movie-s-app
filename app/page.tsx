import MovieSearchApp from "./components/MovieSearchApp";

export default function Home() {
  return (
    <div className="min-h-screen bg-red-950 text-red-50">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-col gap-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-red-300">
            Movie Search
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Find movies fast
          </h1>
          <p className="max-w-2xl text-base leading-7 text-red-200">
            Search for any title and get clean, focused results.
          </p>
        </header>

        <MovieSearchApp />
      </main>
    </div>
  );
}
