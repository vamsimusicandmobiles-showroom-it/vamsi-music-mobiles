'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

const COPY =
  'Phones and televisions. Appliances and accessories. Speakers, earphones, headphones. Everything you need is under one roof in Sriharipuram, so you can see it, hold it and decide for yourself.';

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.26em] inline-block">
      {word}
    </motion.span>
  );
}

/**
 * Sticky statement: the words light up as you scroll through it.
 * It carries the "who are they / what do they sell" answer in one breath.
 */
export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const words = COPY.split(' ');
  const textClass =
    'max-w-[22ch] text-[clamp(2rem,6.2vw,6.25rem)] font-semibold leading-[1.04] tracking-[-0.035em] md:max-w-[24ch]';

  if (reduce) {
    return (
      <section aria-label="About the showroom" className="py-28 md:py-44">
        <div className="wrap">
          <p className={textClass}>{COPY}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      aria-label="About the showroom"
      className="relative h-[230svh] md:h-[250svh]"
    >
      <div className="sticky top-0 flex h-svh items-center">
        <div className="wrap">
          <p className={textClass}>
            <span className="sr-only">{COPY}</span>
            <span aria-hidden>
              {words.map((word, index) => {
                const start = (index / words.length) * 0.82;
                return (
                  <Word
                    key={`${word}-${index}`}
                    word={word}
                    progress={scrollYProgress}
                    range={[start, start + 0.12]}
                  />
                );
              })}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
