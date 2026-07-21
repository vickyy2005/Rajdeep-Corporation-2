import type { Metadata, Viewport } from 'next'
import { Inter, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['500', '600', '700'] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rajdeepcorporation.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Rajdeep Corporation | Industrial Pipes, Fittings & Valves',
  description: 'Your Trusted Partner in Industrial Piping Solutions. Quality pipes, fittings, valves, and flanges for all your industrial needs.',
  keywords: ['industrial pipes', 'fittings', 'valves', 'flanges', 'industrial supplies', 'piping solutions'],
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Rajdeep Corporation | Industrial Piping Solutions',
    description: 'Your Trusted Partner in Industrial Piping Solutions since 2019.',
    url: siteUrl,
    siteName: 'Rajdeep Corporation',
    images: [
      {
        url: '/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Rajdeep Corporation Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0F172A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Rajdeep Corporation',
    url: siteUrl,
    logo: `${siteUrl}/icon-512x512.png`,
    image: `${siteUrl}/icon-512x512.png`,
    description: 'Industrial Pipes, Fittings, Valves, and Flanges Supplier in India.',
    telephone: '+91-7021003269',
    email: 'rajdeepcorpn@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'R.K. Apt., C-Bldg., A-201, Talav Road',
      addressLocality: 'Bhayandar East, Dist Thane',
      postalCode: '401105',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  )
}
