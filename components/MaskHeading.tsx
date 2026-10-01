'use client';

import { Fragment } from 'react';
import type { ElementType } from 'react';
import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';

type MaskHeadingProps = {
  lines: string[];
  as?: ElementType;
  className?: string;
  /** Lines are nowrap by default; allow wrapping on small screens. */
  wrap?: boolean;
};

/**
 * Headline whose lines rise out of a mask when scrolled into view.
 * This is the site's one recurring reveal; body copy is left alone.
 */
export default function MaskHeading({
  lines,
  as = 'h2',
  className,
  wrap = false,
}: MaskHeadingProps) {
  const Tag: ElementType = as;
  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <Fragment key={line}>
          <span className={wrap ? 'mask-line mask-wrap' : 'mask-line'}>
            <motion.span
              className="mask-inner"
              initial={{ y: '108%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1, ease: EASE, delay: index * 0.09 }}
            >
              {line}
            </motion.span>
          </span>{' '}
        </Fragment>
      ))}
    </Tag>
  );
}
