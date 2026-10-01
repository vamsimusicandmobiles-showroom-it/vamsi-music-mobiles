'use client';

import { useRef } from 'react';
import type { PointerEvent, ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

type Variant = 'amp' | 'line' | 'ink' | 'inkLine';

const VARIANTS: Record<Variant, { base: string; fill: string; label: string }> = {
  amp: { base: 'bg-amp text-ink', fill: 'bg-bone', label: '' },
  line: {
    base: 'border border-bone/35 text-bone',
    fill: 'bg-bone',
    label: 'group-hover:text-ink group-focus-visible:text-ink',
  },
  ink: {
    base: 'bg-ink text-bone',
    fill: 'bg-bone',
    label: 'group-hover:text-ink group-focus-visible:text-ink',
  },
  inkLine: {
    base: 'border border-ink/60 text-ink',
    fill: 'bg-ink',
    label: 'group-hover:text-bone group-focus-visible:text-bone',
  },
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: 'md' | 'sm';
  arrow?: boolean;
  className?: string;
};

function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-4 w-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
    >
      <path d="M1 8h13M9 3l5 5-5 5" />
    </svg>
  );
}

/**
 * Link styled as a button. Slides a fill in on hover and leans slightly
 * toward a mouse pointer (touch and keyboard users get the plain version).
 */
export default function Button({
  href,
  children,
  variant = 'amp',
  size = 'md',
  arrow = true,
  className,
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  const external = href.startsWith('http');
  const v = VARIANTS[variant];

  const onMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reduce || event.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((event.clientX - (rect.left + rect.width / 2)) * 0.18);
    my.set((event.clientY - (rect.top + rect.height / 2)) * 0.28);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={cn(
        'group relative inline-flex select-none items-center justify-center overflow-hidden whitespace-nowrap font-semibold uppercase',
        size === 'md'
          ? 'h-14 px-8 text-[0.78rem] tracking-[0.14em]'
          : 'h-10 px-5 text-[0.7rem] tracking-[0.14em]',
        v.base,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0',
          v.fill,
        )}
      />
      <span
        className={cn(
          'relative z-10 flex items-center gap-3 transition-colors duration-300',
          v.label,
        )}
      >
        {children}
        {arrow ? <Arrow /> : null}
      </span>
    </motion.a>
  );
}
