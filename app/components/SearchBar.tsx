export default function SearchBar() {
  return (
    <section className="flex w-full flex-col gap-4 sm:flex-row">
      <input
        type="text"
        placeholder="Search movies, actors, or genres"
        className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-red-50 outline-none transition focus:border-red-400"
      />
      <button className="h-12 rounded-xl bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-500">
        Search
      </button>
    </section>
  );
}
