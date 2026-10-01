const WORDS = [
  'Smartphones',
  'Televisions',
  'Home Appliances',
  'Accessories',
  'Speakers',
  'Earphones',
  'Headphones',
];

/**
 * A slow ticker of what the shop sells. It answers "what do they sell?"
 * within the first scroll. The list is duplicated for a seamless loop;
 * the duplicate is hidden from assistive technology.
 */
export default function Marquee() {
  return (
    <section
      aria-label="What Vamsi Music & Mobiles sells"
      className="marquee-mask overflow-hidden border-y border-line py-5 md:py-7"
    >
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            className="flex shrink-0 items-center"
          >
            {WORDS.map((word, index) => (
              <li key={word} className="flex items-center">
                <span
                  className={
                    index % 2
                      ? 'display outline-text text-[3.4rem] md:text-[5.5rem]'
                      : 'display text-[3.4rem] md:text-[5.5rem]'
                  }
                >
                  {word}
                </span>
                <span
                  aria-hidden
                  className="mx-6 block h-2.5 w-2.5 bg-amp md:mx-10 md:h-3 md:w-3"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
