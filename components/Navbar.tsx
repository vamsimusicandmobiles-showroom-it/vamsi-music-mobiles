'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { business, mailLink, navItems, telLink, whatsappLink } from '@/lib/site';
import { getLenis } from '@/lib/lenis';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/utils';
import Button from './Button';

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <a
      href="#home"
      onClick={onClick}
      aria-label={`${business.name}, back to top`}
      className="flex items-center gap-3 leading-none"
    >
      <span className="display text-[2.15rem] leading-[0.8]">Vamsi</span>
      <span className="text-[0.62rem] font-medium uppercase leading-[1.35] tracking-[0.2em] text-silver">
        Music
        <br />
        &amp; Mobiles
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('home');

  // Compact once the page has moved.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section in the middle of the viewport.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Mobile menu: lock the page, close on Escape.
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500',
          scrolled || open
            ? 'border-line bg-ink/90 backdrop-blur-md'
            : 'border-transparent bg-transparent',
        )}
      >
        <div
          className={cn(
            'wrap flex items-center justify-between transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
            scrolled ? 'h-14' : 'h-[4.75rem] md:h-24',
          )}
        >
          <Logo onClick={() => setOpen(false)} />

          <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={cn(
                  'group relative py-2 text-[0.92rem] font-medium transition-colors duration-300',
                  active === item.id ? 'text-bone' : 'text-silver hover:text-bone',
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    'absolute inset-x-0 -bottom-0.5 h-px origin-left bg-amp transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    active === item.id
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100',
                  )}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Button href={whatsappLink()} size="sm">
                WhatsApp Us
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="-mr-2 flex h-11 items-center gap-3 px-2 text-[0.8rem] font-semibold uppercase tracking-[0.14em] md:hidden"
            >
              <span>{open ? 'Close' : 'Menu'}</span>
              <span aria-hidden className="relative block h-3 w-6">
                <span
                  className={cn(
                    'absolute left-0 h-px w-6 bg-bone transition-all duration-500',
                    open ? 'top-1/2 rotate-45' : 'top-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 h-px w-6 bg-bone transition-all duration-500',
                    open ? 'top-1/2 -rotate-45' : 'bottom-0',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink px-5 pb-8 pt-[5.5rem] md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center">
              <ul>
                {navItems.map((item, index) => (
                  <li key={item.id} className="border-t border-line last:border-b">
                    <motion.a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      autoFocus={index === 0}
                      className="flex items-baseline justify-between py-4"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: EASE, delay: 0.2 + index * 0.07 }}
                    >
                      <span className="display text-[3.6rem] leading-[0.85]">
                        {item.label}
                      </span>
                      {active === item.id ? (
                        <span aria-hidden className="h-2.5 w-2.5 bg-amp" />
                      ) : null}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-5 pt-8">
              <div className="space-y-1 text-[0.95rem] text-silver">
                <p>
                  <a href={telLink} className="text-bone">
                    {business.phoneDisplay}
                  </a>
                </p>
                <p>
                  <a href={mailLink} className="break-all">
                    {business.email}
                  </a>
                </p>
              </div>
              <Button href={whatsappLink()} className="w-full">
                WhatsApp Us
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
