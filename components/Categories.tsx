'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { categories, whatsappLink } from '@/lib/site';
import type { Category } from '@/lib/site';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/utils';
import CategoryVisual from './CategoryVisual';
import MaskHeading from './MaskHeading';

function Art({ item, className }: { item: Category; className?: string }) {
  if (item.image) {
    return (
      <Image
        src={item.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className={cn('object-cover', className)}
      />
    );
  }
  return <CategoryVisual kind={item.visual} className={cn('h-full w-full', className)} />;
}

function ArrowUpRight() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 transition-transform duration-500 group-hover/ask:-translate-y-0.5 group-hover/ask:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
    >
      <path d="M3 13L13 3M5 3h8v8" />
    </svg>
  );
}

function Row({
  item,
  index,
  active,
  onActivate,
}: {
  item: Category;
  index: number;
  active: boolean;
  onActivate: (index: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // Whichever row crosses the middle of the screen becomes active. This is
  // what drives the experience on touch devices, where there is no hover.
  const centred = useInView(ref, { margin: '-44% 0px -44% 0px' });

  useEffect(() => {
    if (centred) onActivate(index);
  }, [centred, index, onActivate]);

  return (
    <li
      ref={ref}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') onActivate(index);
      }}
      onFocus={() => onActivate(index)}
      className="group relative border-t border-line last:border-b"
    >
      <div className="grid grid-cols-[2.6rem_1fr] gap-x-2 py-9 md:grid-cols-[5rem_1fr] md:py-11 lg:py-12">
        <span
          className={cn(
            'pt-1.5 text-[0.95rem] tabular-nums transition-colors duration-500 md:pt-3',
            active ? 'text-amp' : 'text-silver',
          )}
        >
          {item.number}
        </span>

        <div>
          <h3
            className={cn(
              'display text-[13.5vw] transition-[transform,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:text-[7vw] lg:text-[5.6vw]',
              active ? 'translate-x-2 text-bone lg:translate-x-6' : 'text-bone/45',
            )}
          >
            {item.name}
          </h3>

          <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-silver">
            {item.blurb}
          </p>

          {item.items ? (
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.95rem] text-bone/85">
              {item.items.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          ) : null}

          <div className="relative mt-7 aspect-square overflow-hidden border border-line bg-graphite lg:hidden">
            <motion.div
              className="absolute inset-0"
              animate={{ scale: active ? 1 : 1.08, opacity: active ? 1 : 0.55 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <Art item={item} />
            </motion.div>
          </div>

          <a
            href={whatsappLink(item.enquiry)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group/ask mt-6 inline-flex items-center gap-2 border-b border-bone/30 pb-1 text-[0.95rem] font-medium text-bone transition-[opacity,border-color] duration-500 hover:border-amp focus-visible:opacity-100',
              active ? 'opacity-100' : 'lg:opacity-0',
            )}
          >
            Ask about {item.name.toLowerCase()}
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </li>
  );
}

function Plate({ active }: { active: number }) {
  const item = categories[active];
  return (
    <motion.div
      aria-hidden
      className="relative aspect-[4/5] w-full overflow-hidden border border-line"
      animate={{ backgroundColor: item.tone }}
      transition={{ duration: 0.8, ease: EASE }}
      initial={false}
    >
      {categories.map((entry, index) => (
        <motion.div
          key={entry.id}
          className="absolute inset-0"
          initial={false}
          animate={{
            opacity: index === active ? 1 : 0,
            scale: index === active ? 1 : 1.08,
          }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <Art item={entry} />
        </motion.div>
      ))}

      <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-bone/60" />
      <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-bone/60" />
      <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-bone/60" />
      <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-bone/60" />

      <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
        <div className="display relative h-[4.6rem] w-[8rem] overflow-hidden text-[5.2rem] leading-[0.9]">
          <AnimatePresence initial={false}>
            <motion.span
              key={item.number}
              className="absolute left-0 top-0 block"
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {item.number}
            </motion.span>
          </AnimatePresence>
        </div>
        <p className="pb-1 text-right text-[0.95rem] text-silver">{item.name}</p>
      </div>
    </motion.div>
  );
}

export default function Categories() {
  const [active, setActive] = useState(0);

  return (
    <section id="categories" className="relative py-28 md:py-44">
      <div className="wrap">
        <MaskHeading
          lines={['Everyday technology.', 'All in one place.']}
          className="display t-section"
          wrap
        />
        <p className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-silver md:mt-10">
          Everything we stock, grouped by how you use it. Come in and try it
          in person.
        </p>

        <div className="mt-16 lg:mt-24 lg:grid lg:grid-cols-12 lg:gap-x-16">
          <ol className="lg:col-span-7">
            {categories.map((item, index) => (
              <Row
                key={item.id}
                item={item}
                index={index}
                active={active === index}
                onActivate={setActive}
              />
            ))}
          </ol>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <Plate active={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
