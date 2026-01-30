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
    <article className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 sm:gap-4 sm:p-5">
      <div className="flex h-48 items-center justify-center overflow-hidden rounded-xl bg-white/10 text-sm text-red-200 sm:h-56 lg:h-64">
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
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <h2 className="line-clamp-2 text-base font-semibold text-white sm:text-lg">
          {title}
        </h2>
        <div className="flex items-center justify-between">
          <p className="text-xs text-red-200 sm:text-sm">{meta}</p>
          {rating ? (
            <p className="text-xs font-semibold text-yellow-400 sm:text-sm">
              ⭐ {rating.toFixed(1)}
            </p>
          ) : null}
        </div>
      </div>
      <NavigationLink
        href={`/movie/${movieId}`}
        className="w-full rounded-lg border border-white/10 py-2 text-center text-xs font-medium text-red-100 transition hover:border-white/30 sm:text-sm"
      >
        View details
      </NavigationLink>
    </article>
  );
}
