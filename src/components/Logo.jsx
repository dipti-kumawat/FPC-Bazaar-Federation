import { images } from '../config/site.js';

/**
 * Federation logo (client-supplied) with wordmark. `light` is for dark backgrounds.
 * The logo is not a perfect circle (the ribbon is wider than the badge), so it is never clipped:
 * it is shown whole with object-contain, on a small ivory plate when placed on a dark background.
 */
export default function Logo({ light = false, size = 60, compact = false, tagline = 'always' }) {
  return (
    <span className="flex items-center gap-3">
      <span className={`grid shrink-0 place-items-center max-[420px]:!h-11 max-[420px]:!w-11 ${light ? 'rounded-md bg-paper p-1' : ''}`} style={{ width: size, height: size }}>
        <img src={images.logo} alt="" width={size} height={size} className="h-full w-full object-contain" />
      </span>
      {!compact && (
        <span className={`leading-tight max-[340px]:hidden ${light ? 'text-white' : 'text-brand-900'}`}>
          <span className="block font-display text-[15px] font-bold tracking-[.04em] max-[420px]:text-[13px] sm:text-[17px]">FPC BAZAAR<br className="hidden sm:block" /> FEDERATION</span>
          <span className={`${tagline === 'belowXl' ? 'hidden sm:block xl:hidden' : 'block'} whitespace-nowrap text-[10px] font-semibold uppercase tracking-[.16em] sm:text-[10.5px] ${light ? 'text-gold-400' : 'text-gold-700'}`}>Farmers · Youth · Women Welfare</span>
        </span>
      )}
    </span>
  );
}
