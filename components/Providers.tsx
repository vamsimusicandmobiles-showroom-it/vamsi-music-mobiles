'use client';

import type { ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import SmoothScroll from './SmoothScroll';
import Cursor from './Cursor';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    // "user": transform-based motion is switched off for reduced-motion users.
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <Cursor />
      {children}
    </MotionConfig>
  );
}
