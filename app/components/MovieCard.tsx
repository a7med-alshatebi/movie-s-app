type MovieCardProps = {
  title: string;
  meta?: string;
};

export default function MovieCard({ title, meta = "2024 · Action · 2h 30m" }: MovieCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex h-40 items-center justify-center rounded-xl bg-white/10 text-sm text-red-200">
        Poster
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="text-sm text-red-200">{meta}</p>
      </div>
      <button className="w-full rounded-lg border border-white/10 py-2 text-sm font-medium text-red-100 transition hover:border-white/30">
        View details
      </button>
    </article>
  );
}
