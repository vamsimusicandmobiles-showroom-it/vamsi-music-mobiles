import {
  TERMS_LONG,
  business,
  mailLink,
  navItems,
  telLink,
  whatsappLink,
} from '@/lib/site';

const linkClass =
  'inline-block py-1 text-bone underline decoration-transparent underline-offset-[6px] transition-[text-decoration-color] duration-300 hover:decoration-amp';

export default function Footer() {
  return (
    <footer
      data-hide-dock
      className="relative overflow-hidden border-t border-line bg-ink pb-10 pt-20 md:pb-16 md:pt-28"
    >
      <div className="wrap relative z-10">
        <div className="grid gap-14 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-5">
            <p className="display text-[2.6rem] md:text-[3.4rem]">
              Vamsi Music &amp; Mobiles
            </p>
            <address className="mt-6 text-[1rem] leading-relaxed text-silver">
              {business.address.street}
              <br />
              {business.address.locality}, {business.address.region} —{' '}
              {business.address.postalCode}
            </address>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="text-[0.9rem] text-silver">Contact</p>
            <ul className="mt-3 text-[1rem]">
              <li>
                <a href={telLink} className={linkClass}>
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={mailLink} className={`${linkClass} break-all`}>
                  {business.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <p className="text-[0.9rem] text-silver">Explore</p>
            <ul className="mt-3 text-[1rem]">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line pt-8 text-[0.85rem] leading-relaxed text-silver md:mt-28 md:flex-row md:items-start md:justify-between md:gap-16">
          <p className="max-w-xl">{TERMS_LONG}</p>
          <p className="shrink-0">
            &copy; Vamsi Music &amp; Mobiles. All rights reserved.
          </p>
        </div>
      </div>

      <p
        aria-hidden
        className="display outline-text pointer-events-none -mb-[9vw] mt-14 block select-none whitespace-nowrap text-center text-[58vw] leading-[0.74] [--stroke:rgba(236,232,225,0.16)] md:-mb-[7vw] md:mt-20 md:text-[36vw]"
      >
        Vamsi
      </p>
    </footer>
  );
}
