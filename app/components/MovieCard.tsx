import NavigationLink from "./NavigationLink";

type MovieCardProps = {
  title: string;
  meta?: string;
  posterUrl?: string;
  rating?: number;
  movieId: number;
};

export default function MovieCard({
  title,
  meta = "2024",
  posterUrl,
  rating,
  movieId,
}: MovieCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex h-40 items-center justify-center overflow-hidden rounded-xl bg-white/10 text-sm text-red-200">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${title} poster`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          "Poster"
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <div className="flex items-center justify-between">
          <p className="text-sm text-red-200">{meta}</p>
          {rating ? <p className="text-sm font-semibold text-yellow-400">⭐ {rating.toFixed(1)}</p> : null}
        </div>
      </div>
      <NavigationLink
        href={`/movie/${movieId}`}
        className="w-full rounded-lg border border-white/10 py-2 text-center text-sm font-medium text-red-100 transition hover:border-white/30"
      >
        View details
      </NavigationLink>
    </article>
  );
}
