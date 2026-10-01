'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  business,
  directionsLink,
  mailLink,
  mapEmbedSrc,
  mapOpenLink,
  media,
  telLink,
  whatsappLink,
} from '@/lib/site';
import Button from './Button';
import MaskHeading from './MaskHeading';

const CONTACT = [
  { label: 'Phone', text: business.phoneDisplay, href: telLink },
  { label: 'WhatsApp', text: business.phoneDisplay, href: whatsappLink() },
  { label: 'Email', text: business.email, href: mailLink },
] as const;

export default function Showroom() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // The area name drifts sideways behind the content as the section passes.
  const drift = useTransform(scrollYProgress, [0, 1], ['6%', '-22%']);

  return (
    <section
      ref={ref}
      id="visit"
      className="relative overflow-hidden border-t border-line py-28 md:py-44"
    >
      <motion.p
        aria-hidden
        style={reduce ? undefined : { x: drift }}
        className="display outline-text pointer-events-none absolute left-0 top-[6%] -z-0 select-none whitespace-nowrap text-[58vw] [--stroke:rgba(236,232,225,0.13)] md:top-[2%] md:text-[34vw]"
      >
        Sriharipuram
      </motion.p>

      <div className="wrap relative z-10">
        <MaskHeading
          lines={['Come see it', 'for yourself.']}
          className="display t-section"
          wrap
        />

        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <address className="not-italic">
              <p className="display text-[2.4rem] md:text-[3rem]">
                {business.name}
              </p>
              <p className="mt-4 text-[1.15rem] leading-snug text-bone">
                {business.address.street}
                <br />
                {business.address.locality} — {business.address.postalCode}
              </p>
              <p className="mt-1 text-[0.95rem] text-silver">
                {business.address.region}, India
              </p>
            </address>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button href={directionsLink}>Get directions</Button>
              <Button href={telLink} variant="line">
                Call the showroom
              </Button>
            </div>

            <dl className="mt-12 border-t border-line">
              {CONTACT.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-[6.5rem_1fr] sm:items-baseline sm:gap-4"
                >
                  <dt className="text-[0.9rem] text-silver">{row.label}</dt>
                  <dd className="min-w-0">
                    <a
                      href={row.href}
                      {...(row.label === 'WhatsApp'
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="break-words text-[1.02rem] text-bone underline decoration-bone/25 underline-offset-[6px] transition-colors duration-300 hover:decoration-amp"
                    >
                      {row.text}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-7">
            {media.showroomImage ? (
              <div className="relative mb-6 aspect-[16/10] overflow-hidden border border-line">
                <Image
                  src={media.showroomImage}
                  alt={media.showroomAlt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}

            <div className="relative overflow-hidden border border-line bg-graphite">
              <iframe
                title={`Map showing ${business.name}, ${business.address.street}, ${business.address.locality}`}
                src={mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-dark block h-[22rem] w-full border-0 md:h-[30rem] lg:h-[34rem]"
                allowFullScreen
              />
            </div>

            <a
              href={mapOpenLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 border-b border-bone/30 pb-1 text-[0.95rem] font-medium transition-colors duration-300 hover:border-amp"
            >
              Open in Google Maps
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="square"
              >
                <path d="M3 13L13 3M5 3h8v8" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
