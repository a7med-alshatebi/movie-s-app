type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  isLoading?: boolean;
};

export default function SearchBar({
  value,
  onChange,
  onSearch,
  isLoading = false,
}: SearchBarProps) {
  return (
    <form
      className="flex w-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 sm:flex-row sm:items-center sm:gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
    >
      <input
        type="text"
        placeholder="Search movies, actors, or genres"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-xl border border-transparent bg-transparent px-4 text-sm text-red-50 outline-none placeholder:text-red-300/70 focus:border-red-400"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="h-12 w-full rounded-xl bg-red-500 px-6 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
