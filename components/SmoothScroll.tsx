'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { setLenis } from '@/lib/lenis';

/**
 * Lenis smooth scrolling + smooth in-page anchors.
 * Disabled entirely for users who prefer reduced motion (native scroll and
 * native anchor jumps are used instead). Touch devices keep native scrolling.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(lenis);

    let frame = requestAnimationFrame(function loop(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    });

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target as Element | null;
      const anchor = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash.length < 2) return;
      const section = document.getElementById(hash.slice(1));
      if (!section) return;
      event.preventDefault();
      lenis.start(); // the mobile menu may have paused it
      lenis.scrollTo(section, { duration: 1.4 });
      window.history.replaceState(null, '', hash);
      // Skip link: move keyboard focus along with the scroll.
      if (section.id === 'main') section.focus({ preventScroll: true });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
