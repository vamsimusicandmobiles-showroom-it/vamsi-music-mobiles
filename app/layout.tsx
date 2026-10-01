import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Instrument_Sans, Sofia_Sans_Extra_Condensed } from 'next/font/google';
import Providers from '@/components/Providers';
import { business, mapOpenLink } from '@/lib/site';
import './globals.css';

// The display face is only ever used at weight 800, so only that is loaded.
const display = Sofia_Sans_Extra_Condensed({
  subsets: ['latin'],
  weight: ['800'],
  variable: '--font-display',
  display: 'swap',
});

// Instrument Sans is a variable font: one file covers every weight we use.

const body = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const TITLE =
  'Vamsi Music & Mobiles | Smartphones, TVs & Electronics in Visakhapatnam';
const DESCRIPTION =
  'Vamsi Music & Mobiles in Sriharipuram, Visakhapatnam — smartphones, TVs, home appliances, accessories, speakers, earphones and headphones. Ask about EMI, exchange offers, finance options and more.';

// Optional: set NEXT_PUBLIC_SITE_URL (e.g. https://www.example.com) once the
// domain is known so social-share images and canonical URLs resolve properly.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: TITLE,
  description: DESCRIPTION,
    verification: {
    google: 'xaIqfb6sf6G6rXCo2XC2IRVZXbObfPsBzAkJnRqtuhI',
  },
  applicationName: business.name,
  ...(siteUrl ? { alternates: { canonical: '/' } } : {}),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: business.name,
    title: TITLE,
    description: DESCRIPTION,
    ...(siteUrl ? { url: '/' } : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#08080a',
  width: 'device-width',
  initialScale: 1,
};

/**
 * LocalBusiness structured data. Only details supplied by the owner appear:
 * no opening hours, coordinates, ratings or price range have been provided,
 * so none are included.
 */
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ElectronicsStore',
  name: business.name,
  description: DESCRIPTION,
  telephone: business.phoneTel,
  email: business.email,
  ...(siteUrl ? { url: siteUrl } : {}),
  hasMap: mapOpenLink,
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address.street,
    addressLocality: business.address.locality,
    addressRegion: business.address.region,
    postalCode: business.address.postalCode,
    addressCountry: business.address.country,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <head>
        <meta
          name="google-site-verification"
          content="xaIqfb6sf6G6rXCo2XC2IRVZXbObfPsBzAkJnRqtuhI"
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-amp focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <div aria-hidden className="grain" />
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
      </body>
    </html>
  );
}
