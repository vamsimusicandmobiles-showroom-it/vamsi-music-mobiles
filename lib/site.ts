/**
 * Single source of truth for everything the site says about the business.
 * Nothing here is invented: only details supplied by the owner.
 * No opening hours, prices, reviews or stats have been provided, so none appear.
 */

export const business = {
  name: 'Vamsi Music & Mobiles',
  phoneDisplay: '+91 9885123426',
  phoneTel: '+919885123426',
  whatsappNumber: '919885123426',
  email: 'vamsimusicandmobiles@gmail.com',
  address: {
    street: 'Sriharipuram, Opp New Ramalayam',
    locality: 'Visakhapatnam',
    region: 'Andhra Pradesh',
    postalCode: '530011',
    country: 'IN',
  },
  /**
   * Text used to locate the showroom on Google Maps (no API key needed).
   * Once the exact Google Maps listing is known, replace this with the
   * business name as it appears on Google Maps for a more precise pin.
   */
  mapQuery:
    'Vamsi Music & Mobiles, Sriharipuram, Visakhapatnam, Andhra Pradesh 530011',
} as const;

export const DEFAULT_ENQUIRY =
  "Hi Vamsi Music & Mobiles, I'd like to enquire about your products and current offers.";

export function whatsappLink(message: string = DEFAULT_ENQUIRY): string {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const telLink = `tel:${business.phoneTel}`;
export const mailLink = `mailto:${business.email}`;

export const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  business.mapQuery,
)}`;

export const mapOpenLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  business.mapQuery,
)}`;

export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  business.mapQuery,
)}&output=embed`;

export const TERMS_SHORT =
  'Terms and conditions apply. Offer availability may vary. Please contact the showroom for current details.';

export const TERMS_LONG =
  'Terms and conditions apply. Offers, financing, exchange programs and complimentary accessories are subject to applicable eligibility, availability and terms.';

/**
 * Real photography slots. Drop files into /public/images and set the paths
 * here. While a value is null, the abstract artwork is shown instead.
 *   heroImage      full-bleed showroom or product photo behind the hero art
 *   showroomImage  wide storefront / interior photo in the visit section
 */
export const media: {
  heroImage: string | null;
  heroAlt: string;
  showroomImage: string | null;
  showroomAlt: string;
} = {
  heroImage: null,
  heroAlt: 'Inside the Vamsi Music & Mobiles showroom',
  showroomImage: null,
  showroomAlt: 'The Vamsi Music & Mobiles storefront in Sriharipuram',
};

export const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'Categories', id: 'categories' },
  { label: 'Why Vamsi', id: 'why-vamsi' },
  { label: 'Visit Us', id: 'visit' },
] as const;

export type VisualKind =
  | 'phone'
  | 'tv'
  | 'appliance'
  | 'accessory'
  | 'speaker'
  | 'audio';

export type Category = {
  id: string;
  number: string;
  name: string;
  blurb: string;
  items?: string[];
  enquiry: string;
  visual: VisualKind;
  /** Optional real photo for this category (path under /public). */
  image?: string | null;
  /** Subtle tonal shift of the preview plate when this category is active. */
  tone: string;
};

export const categories: Category[] = [
  {
    id: 'smartphones',
    number: '01',
    name: 'Smartphones',
    blurb: 'Hold it, try it, then decide.',
    enquiry:
      "Hi Vamsi Music & Mobiles, I'd like to enquire about smartphones.",
    visual: 'phone',
    tone: '#141518',
  },
  {
    id: 'televisions',
    number: '02',
    name: 'Televisions',
    blurb: 'See the picture before it comes home.',
    enquiry:
      "Hi Vamsi Music & Mobiles, I'd like to enquire about televisions.",
    visual: 'tv',
    tone: '#111316',
  },
  {
    id: 'home-appliances',
    number: '03',
    name: 'Home Appliances',
    blurb: 'The quiet machines that keep a home running.',
    enquiry:
      "Hi Vamsi Music & Mobiles, I'd like to enquire about home appliances.",
    visual: 'appliance',
    tone: '#151412',
  },
  {
    id: 'accessories',
    number: '04',
    name: 'Accessories',
    blurb: 'The small things that complete the upgrade.',
    enquiry:
      "Hi Vamsi Music & Mobiles, I'd like to enquire about accessories.",
    visual: 'accessory',
    tone: '#131417',
  },
  {
    id: 'speakers',
    number: '05',
    name: 'Speakers',
    blurb: 'Sound that fills the room.',
    enquiry: "Hi Vamsi Music & Mobiles, I'd like to enquire about speakers.",
    visual: 'speaker',
    tone: '#17140d',
  },
  {
    id: 'audio',
    number: '06',
    name: 'Audio',
    blurb: 'Earphones and headphones for wherever you listen.',
    items: ['Earphones', 'Headphones', 'Speakers'],
    enquiry:
      "Hi Vamsi Music & Mobiles, I'd like to enquire about earphones, headphones and speakers.",
    visual: 'audio',
    tone: '#101214',
  },
];

export type Benefit = {
  id: string;
  title: string;
  body: string;
};

/** The featured benefit, given the big typographic treatment. */
export const featuredBenefit = {
  figure: '0%',
  title: 'EMI',
  body: 'Flexible payment options that make a bigger upgrade easier to plan.',
  note: 'Ask in-store about available offers.',
};

export const benefits: Benefit[] = [
  {
    id: 'exchange',
    title: 'Exchange Offers',
    body: 'Upgrade while exploring available exchange options.',
  },
  {
    id: 'accessories',
    title: 'Free Accessories',
    body: 'Eligible purchases may include complimentary accessories.',
  },
  {
    id: 'service',
    title: 'Local Service',
    body: 'Local support when you need it, close to home in Sriharipuram.',
  },
  {
    id: 'warranty',
    title: 'Warranty Support',
    body: 'Assistance with applicable manufacturer warranty support.',
  },
  {
    id: 'finance',
    title: 'Finance Options',
    body: 'Ask about available financing options.',
  },
];

export const BENEFITS_ENQUIRY =
  "Hi Vamsi Music & Mobiles, I'd like to know about EMI, exchange offers and finance options.";
