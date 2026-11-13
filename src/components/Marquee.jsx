/**
 * Continuously scrolling strip. Pauses on hover/focus; stops for people who prefer reduced motion
 * (the strip then becomes a normal horizontally scrollable row). Content is duplicated once for a seamless loop,
 * the copy is hidden from screen readers.
 */
export default function Marquee({ children, seconds = 40, reverse = false, label }) {
  return (
    <div className="marquee group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] motion-reduce:overflow-x-auto" role="region" aria-label={label}>
      <div className="marquee-track flex w-max items-center gap-4 py-1 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]" style={{ animationDuration: `${seconds}s`, animationDirection: reverse ? 'reverse' : 'normal' }}>
        <div className="flex shrink-0 items-center gap-4">{children}</div>
        <div className="flex shrink-0 items-center gap-4" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
