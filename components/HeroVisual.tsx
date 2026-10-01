'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { media } from '@/lib/site';
import { cssVars } from '@/lib/utils';

const BARS = 26;

/**
 * Abstract hero artwork, built from the brand name itself:
 *   Music   -> a turning metal disc
 *   Mobiles -> a glass slab
 *   Screens -> a framed equaliser
 * No product photography is implied. If `media.heroImage` is set, a real photo
 * sits underneath and the artwork lays over it.
 */
export default function HeroVisual() {
  const root = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20, mass: 0.8 });
  const sy = useSpring(py, { stiffness: 60, damping: 20, mass: 0.8 });

  const discX = useTransform(sx, [-0.5, 0.5], [16, -16]);
  const discY = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const slabX = useTransform(sx, [-0.5, 0.5], [-34, 34]);
  const slabY = useTransform(sy, [-0.5, 0.5], [-24, 24]);
  const frameX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const frameY = useTransform(sy, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    const el = root.current;
    const onMove = (event: PointerEvent) => {
      px.set(event.clientX / window.innerWidth - 0.5);
      py.set(event.clientY / window.innerHeight - 0.5);
      if (el) {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--lx', `${event.clientX - rect.left}px`);
        el.style.setProperty('--ly', `${event.clientY - rect.top}px`);
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [px, py]);

  return (
    <>
      {media.heroImage ? (
        <div className="absolute inset-0">
          <Image
            src={media.heroImage}
            alt={media.heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
        </div>
      ) : null}

      <div
        ref={root}
        aria-hidden
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
      >
        {/* cursor-following light */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(520px circle at var(--lx, 74%) var(--ly, 30%), rgba(236,232,225,0.07), transparent 62%)',
          }}
        />

        {/* MUSIC: the disc */}
        <div
          className="hero-art absolute -right-[40vw] top-[2svh] w-[114vw] md:-right-[13vw] md:top-1/2 md:w-[min(64vw,96svh)] md:-translate-y-1/2"
          style={cssVars({ '--d': '100ms' })}
        >
          <motion.div style={{ x: discX, y: discY }} className="relative aspect-square">
            <div className="disc-shadow absolute inset-0 rounded-full" />
            <div className="disc-sheen absolute inset-0 rounded-full" />
            <div className="disc-grooves absolute inset-0 rounded-full" />
            <div className="disc-gloss absolute inset-0 rounded-full" />
            <div className="absolute left-1/2 top-1/2 flex aspect-square w-[26%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-amp">
              <div className="aspect-square w-[13%] rounded-full bg-ink" />
            </div>
          </motion.div>
        </div>

        {/* MOBILES: the slab */}
        <div
          className="hero-art absolute right-[10vw] top-[15svh] w-[30vw] md:right-[27vw] md:top-[18svh] md:w-[min(14vw,19svh)] lg:top-[27svh]"
          style={cssVars({ '--d': '260ms' })}
        >
          <motion.div style={{ x: slabX, y: slabY }}>
            <div className="slab relative aspect-[9/19] rounded-[2rem] p-[3.5%]">
              <div className="relative h-full w-full overflow-hidden rounded-[1.55rem] bg-[#050506]">
                <svg viewBox="0 0 100 210" className="absolute inset-0 h-full w-full" fill="none">
                  <circle cx="50" cy="104" r="36" stroke="#8B0000" strokeWidth="0.8" />
                  <circle cx="50" cy="104" r="25" stroke="#8B0000" strokeOpacity="0.55" strokeWidth="0.8" />
                  <circle cx="50" cy="104" r="14" stroke="#8B0000" strokeOpacity="0.3" strokeWidth="0.8" />
                  <circle cx="50" cy="104" r="2.6" fill="#8B0000" />
                  <rect x="40" y="200" width="20" height="1.6" rx="0.8" fill="#ece8e1" fillOpacity="0.4" />
                </svg>
                <div className="slab-sweep absolute inset-y-0 left-0 w-1/2" />
              </div>
            </div>
            <p className="mt-4 hidden items-center gap-3 text-[0.8rem] text-silver lg:flex">
              <span className="h-px w-8 bg-silver/50" />
              Mobiles
            </p>
          </motion.div>
        </div>

        {/* SCREENS: the frame */}
        <div
          className="hero-art absolute right-[3.5vw] top-[13svh] hidden w-[21vw] md:block"
          style={cssVars({ '--d': '420ms' })}
        >
          <motion.div style={{ x: frameX, y: frameY }}>
            <p className="mb-3 hidden items-center gap-3 text-[0.8rem] text-silver lg:flex">
              <span className="h-px w-8 bg-silver/50" />
              Screens
            </p>
            <div className="relative aspect-video border border-bone/25 bg-ink/70 p-[4%]">
              <span className="absolute -left-px -top-px h-2.5 w-2.5 border-l border-t border-bone" />
              <span className="absolute -right-px -top-px h-2.5 w-2.5 border-r border-t border-bone" />
              <span className="absolute -bottom-px -left-px h-2.5 w-2.5 border-b border-l border-bone" />
              <span className="absolute -bottom-px -right-px h-2.5 w-2.5 border-b border-r border-bone" />
              <div className="eq flex h-full items-end gap-[2.6%]">
                {Array.from({ length: BARS }, (_, i) => (
                  <span
                    key={i}
                    className={i % 7 === 3 ? 'flex-1 bg-amp' : 'flex-1 bg-bone/60'}
                    style={{
                      height: `${28 + ((i * 53) % 68)}%`,
                      animationDelay: `${((i * 37) % 24) / 10}s`,
                      animationDuration: `${2 + ((i * 11) % 9) / 10}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <p
          className="hero-art absolute right-[3.5vw] top-[51svh] hidden items-center gap-3 text-[0.8rem] text-silver lg:flex"
          style={cssVars({ '--d': '560ms' })}
        >
          <span className="h-px w-8 bg-silver/50" />
          Music
        </p>
      </div>

      {/* keep the headline legible over the art */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/30 to-transparent md:from-ink/90 md:via-ink/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-ink via-ink/70 to-transparent"
      />
    </>
  );
}
