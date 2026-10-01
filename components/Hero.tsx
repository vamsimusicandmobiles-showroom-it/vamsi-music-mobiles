import { Fragment } from 'react';
import { business, whatsappLink } from '@/lib/site';
import { cssVars } from '@/lib/utils';
import Button from './Button';
import HeroVisual from './HeroVisual';

const LINES = [
  { text: 'Technology', indent: '' },
  { text: 'that moves', indent: 'ml-[7vw] md:ml-[9vw]' },
  { text: 'with you.', indent: 'ml-[3vw] md:ml-[4vw]' },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      <HeroVisual />

      <div className="wrap relative z-10 flex flex-1 flex-col pb-10 pt-28 md:pb-12 md:pt-32">
        <p
          className="hero-fade flex items-center gap-3 text-[0.9rem] text-silver"
          style={cssVars({ '--d': '700ms' })}
        >
          <span aria-hidden className="h-2 w-2 bg-amp" />
          Sriharipuram, Visakhapatnam {business.address.postalCode}
        </p>

        <div className="flex-1" />

        <h1 className="display t-hero">
          <span className="sr-only">{business.name}. </span>
          {LINES.map((line, index) => (
            <Fragment key={line.text}>
              <span className={`mask-line ${line.indent}`}>
                <span
                  className="hero-line"
                  style={cssVars({ '--d': `${200 + index * 110}ms` })}
                >
                  {line.text}
                </span>
              </span>{' '}
            </Fragment>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:items-end">
          <div
            className="hero-fade lg:col-span-5"
            style={cssVars({ '--d': '650ms' })}
          >
            <p className="display text-[1.7rem] leading-none md:text-[2.1rem]">
              {business.name}
            </p>
            <p className="mt-3 max-w-[30rem] text-[1rem] leading-relaxed text-silver">
              Smartphones, entertainment, appliances and everyday technology —
              all under one roof in Sriharipuram.
            </p>
          </div>

          <div
            className="hero-fade flex flex-col gap-3 sm:flex-row lg:col-span-7 lg:justify-end"
            style={cssVars({ '--d': '780ms' })}
          >
            <Button href="#visit">Visit the showroom</Button>
            <Button href={whatsappLink()} variant="line">
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
