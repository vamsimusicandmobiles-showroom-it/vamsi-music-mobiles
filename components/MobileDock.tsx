'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { telLink, whatsappLink } from '@/lib/site';
import { EASE } from '@/lib/motion';

/**
 * Phones only: a thumb-reach Call / WhatsApp bar. It appears once the visitor
 * has scrolled past the hero and steps aside while the closing call to action
 * and footer (marked `data-hide-dock`) are on screen, since they already
 * carry the same buttons.
 */
export default function MobileDock() {
  const [scrolled, setScrolled] = useState(false);
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll('[data-hide-dock]');
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        setCovered(visible.size > 0);
      },
      { threshold: 0.15 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const show = scrolled && !covered;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ink/95 px-3 pt-3 backdrop-blur-md md:hidden"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="grid grid-cols-2 gap-3">
            <a
              href={telLink}
              className="flex h-14 items-center justify-center border border-bone/35 text-[0.78rem] font-semibold uppercase tracking-[0.14em] active:bg-bone active:text-ink"
            >
              Call
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-center bg-amp text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink active:bg-bone"
            >
              WhatsApp
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
