import { business, directionsLink, whatsappLink } from '@/lib/site';
import Button from './Button';
import MaskHeading from './MaskHeading';

/**
 * The closing push: one colour, one message, two ways to act.
 * `data-hide-dock` lets the mobile dock step aside while this is on screen.
 */
export default function FinalCTA() {
  return (
    <section
      data-hide-dock
      className="relative overflow-hidden bg-amp text-ink"
    >
      <div className="wrap py-24 md:py-40">
        <MaskHeading
          as="h2"
          lines={['Your next', 'upgrade', 'starts here.']}
          className="display t-final"
        />

        <div className="mt-12 grid gap-8 md:mt-20 md:grid-cols-12 md:items-end">
          <p className="max-w-sm text-[1.15rem] font-medium leading-snug md:col-span-5">
            Visit {business.name} in Sriharipuram.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row md:col-span-7 md:justify-end">
            <Button href={directionsLink} variant="ink">
              Visit the showroom
            </Button>
            <Button href={whatsappLink()} variant="inkLine">
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
