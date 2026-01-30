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
      className="flex w-full flex-col gap-4 sm:flex-row"
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
        className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-red-50 outline-none transition focus:border-red-400"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="h-12 rounded-xl bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
