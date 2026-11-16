import { AnimatePresence, motion } from 'framer-motion';

/**
 * Grid whose cards glide into their new places when filters change, fade in when they appear
 * and shrink away when they are filtered out.
 */
export default function AnimatedGrid({ items, getKey, render, className = '' }) {
  return (
    <motion.div layout className={className}>
      <AnimatePresence mode="popLayout" initial={false}>
        {items.map((it) => (
          <motion.div
            key={getKey(it)}
            layout
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
            transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
            className="h-full"
          >
            {render(it)}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
