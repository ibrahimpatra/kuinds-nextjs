// pages/_document.js
// This file is SERVER-RENDERED — Google reads everything here directly.
// This is where ALL site-wide SEO lives: favicon, OG tags, structured data.

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* =============================================
            FAVICON — shows in browser tab
            Use the SVG favicon from public/favicon.svg
            ============================================= */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />

        {/* Tab color on mobile browsers (Android Chrome shows this in taskbar) */}
        <meta name="theme-color" content="#0f1a0f" />

        {/* =============================================
            SEO BASICS
            ============================================= */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Kuwait India Driving School" />
        <meta name="keywords" content="driving school kuwait, indian driving school kuwait, kuwait driving lessons, learn to drive kuwait, driving instructor kuwait, kuwait driving test, driving school salmiya, hindi driving instructor kuwait, tamil driving instructor" />

        {/* =============================================
            OPEN GRAPH — controls WhatsApp / Facebook / 
            Twitter preview cards when you share a link.
            The og:image is what shows as the big preview image.
            Upload your og-image.png to /public/ folder.
            ============================================= */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kuwait India Driving School" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://kuwaitindiadrivingschool.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Kuwait India Driving School - Professional Driving Lessons in Kuwait" />

        {/* Twitter / X card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://kuwaitindiadrivingschool.com/og-image.png" />

        {/* =============================================
            GOOGLE SEARCH CONSOLE VERIFICATION
            HOW TO GET YOUR CODE:
            1. Go to search.google.com/search-console
            2. Click "Add Property" → enter kuwaitindiadrivingschool.com
            3. Choose "HTML tag" verification method
            4. Copy the content value they give you
            5. Paste it below replacing YOUR_CODE_HERE
            6. Push to GitHub → Vercel redeploys → click Verify in Search Console
            ============================================= */}
        <meta name="google-site-verification" content="H_Qqt85SyviL3G2mkW-69P-FgvDy6fi1EMdcqoDF86M" />

        {/* =============================================
            LOCAL BUSINESS STRUCTURED DATA (JSON-LD)
            Google uses this to show your business in 
            rich results, maps, and knowledge panels.
            ============================================= */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",           // ← change from DrivingSchool
              "name": "Kuwait India Driving School",
              "description": "Professional driving lessons in Kuwait. Expert instructors teaching in English, Arabic, Hindi, Telugu & Tamil.",
              "url": "https://kuwaitindiadrivingschool.com",
              "telephone": "+96555998579",
              "image": "https://kuwaitindiadrivingschool.com/og-image.png",
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
                "ratingValue": 5.0,              // ← numbers not strings
                "reviewCount": 100,              // ← numbers not strings
                "bestRating": 5,
                "worstRating": 1
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
