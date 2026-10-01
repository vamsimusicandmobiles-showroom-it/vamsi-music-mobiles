import {
  BENEFITS_ENQUIRY,
  TERMS_SHORT,
  benefits,
  featuredBenefit,
  whatsappLink,
} from '@/lib/site';
import { cn } from '@/lib/utils';
import Button from './Button';
import MaskHeading from './MaskHeading';

/**
 * Where each of the five supporting benefits sits on the 12-column grid
 * (md and up). The offsets are deliberate: the eye zig-zags down the page
 * instead of reading six identical cards.
 */
const PLACEMENT = [
  'md:col-span-5 md:col-start-1',
  'md:col-span-5 md:col-start-7 md:mt-24',
  'md:col-span-5 md:col-start-2 md:-mt-4',
  'md:col-span-5 md:col-start-8 md:mt-20',
  'md:col-span-5 md:col-start-1 md:-mt-2',
];

export default function Benefits() {
  return (
    <section
      id="why-vamsi"
      className="relative border-t border-line py-28 md:py-44"
    >
      <div className="wrap">
        <MaskHeading
          lines={['More than', 'a store.']}
          className="display t-section"
          wrap
        />

        {/* Featured benefit ------------------------------------------------ */}
        <div className="mt-16 grid items-end gap-x-10 gap-y-6 md:mt-24 md:grid-cols-12">
          <p
            aria-hidden
            className="display -ml-[0.04em] text-[62vw] text-amp md:col-span-7 md:text-[min(36vw,44rem)]"
          >
            {featuredBenefit.figure}
          </p>

          <div className="md:col-span-5 md:pb-[3vw]">
            <h3 className="display t-sub">
              <span className="sr-only">{featuredBenefit.figure} </span>
              {featuredBenefit.title}
            </h3>
            <p className="mt-5 max-w-sm text-[1.05rem] leading-relaxed text-silver">
              {featuredBenefit.body}
            </p>
            <p className="mt-3 text-[0.95rem] text-bone">
              {featuredBenefit.note}
            </p>
          </div>
        </div>

        {/* Supporting benefits -------------------------------------------- */}
        <ul className="mt-20 grid gap-x-10 gap-y-12 md:mt-28 md:grid-cols-12 md:gap-y-0">
          {benefits.map((benefit, index) => (
            <li
              key={benefit.id}
              className={cn('border-t border-line pt-6', PLACEMENT[index])}
            >
              <span
                aria-hidden
                className="mb-6 block h-0.5 w-8 bg-amp"
              />
              <h3 className="display text-[3rem] md:text-[4.4rem]">
                {benefit.title}
              </h3>
              <p className="mt-4 max-w-sm text-[1rem] leading-relaxed text-silver">
                {benefit.body}
              </p>
            </li>
          ))}
        </ul>

        {/* Soft conversion point ------------------------------------------ */}
        <div className="mt-24 grid gap-8 border-t border-line pt-12 md:mt-36 md:grid-cols-12 md:items-end md:pt-16">
          <div className="md:col-span-7">
            <p className="display t-sub">Have something in mind?</p>
            <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-silver">
              Ask us about availability, offers and financing.
            </p>
          </div>
          <div className="md:col-span-5 md:flex md:justify-end">
            <Button
              href={whatsappLink(BENEFITS_ENQUIRY)}
              className="w-full sm:w-auto"
            >
              Chat on WhatsApp
            </Button>
          </div>
        </div>

        <p className="mt-10 max-w-xl text-[0.85rem] leading-relaxed text-silver/80">
          {TERMS_SHORT}
        </p>
      </div>
    </section>
  );
}
