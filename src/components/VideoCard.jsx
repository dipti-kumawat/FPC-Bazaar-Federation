/** Self-hosted product/story video with poster. Loads nothing until the visitor presses play. */
export default function VideoCard({ src, poster, title, desc }) {
  return (
    <figure className="card overflow-hidden">
      <div className="mx-auto aspect-[9/16] max-h-[560px] w-full bg-brand-950">
        <video className="h-full w-full object-contain" controls playsInline preload="none" poster={poster} aria-label={title}>
          <source src={src} type="video/mp4" />
        </video>
      </div>
      <figcaption className="p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-brand-900">{title}</h3>
        {desc && <p className="mt-1 text-sm leading-6 text-slate-600">{desc}</p>}
      </figcaption>
    </figure>
  );
}
