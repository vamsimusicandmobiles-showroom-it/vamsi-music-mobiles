'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * A quiet follower ring for mouse users. It grows over anything clickable.
 * Not rendered on touch devices or for reduced-motion users, and the native
 * cursor is never hidden.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 520, damping: 42, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      setHovering(Boolean(target?.closest?.('a, button, [data-cursor]')));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="-ml-4 -mt-4 h-8 w-8 rounded-full border border-bone"
        animate={{ scale: hovering ? 2.1 : 1, opacity: visible ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      />
    </motion.div>
  );
}
