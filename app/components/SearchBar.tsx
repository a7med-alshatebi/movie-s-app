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
      className="flex w-full items-center gap-3"
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
        className="h-11 w-full rounded-full border border-white/10 bg-white/5 px-4 text-sm text-red-50 outline-none placeholder:text-red-300/70 focus:border-red-400"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="hidden h-11 items-center justify-center rounded-full bg-red-500 px-5 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-70 sm:inline-flex"
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
