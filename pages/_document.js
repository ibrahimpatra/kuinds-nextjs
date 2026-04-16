// pages/_document.js
// This is where you put SEO meta tags, structured data, and fonts.
// Next.js renders this on the SERVER - Google can read all of it. This is the #1 SEO advantage over CRA.

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Kuwait India Driving School" />
        <meta name="keywords" content="driving school kuwait, indian driving school kuwait, kuwait driving lessons, learn to drive kuwait, driving instructor kuwait, kuwait driving test, driving school salmiya, hindi driving instructor kuwait, tamil driving instructor" />

        {/* Open Graph - for WhatsApp/Facebook link previews */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kuwait India Driving School" />
        <meta property="og:locale" content="en_US" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />

        {/* Google Search Console verification - add your code here */}
        {/* <meta name="google-site-verification" content="YOUR_CODE_HERE" /> */}

        {/* Local Business Structured Data (JSON-LD) — Google reads this for rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DrivingSchool",
              "name": "Kuwait India Driving School",
              "description": "Professional driving lessons in Kuwait. Expert instructors teaching in English, Arabic, Hindi, Telugu & Tamil.",
              "url": "https://kuwaitindiadriving.com",
              "telephone": "+96555998579",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "3 Al Qatami St, Salmiya",
                "addressLocality": "Salmiya",
                "addressCountry": "KW"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 29.3263828,
                "longitude": 48.05531
              },
              "openingHours": "Mo-Su 07:00-22:00",
              "priceRange": "$$",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "100"
              }
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
