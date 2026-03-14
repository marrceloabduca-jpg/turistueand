import type { Metadata } from 'next'
import { Poppins, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans"
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif"
});

const siteTitle = 'Turismeando - Viajes y Turismo | Argentina'
const siteDescription = 'Agencia de viajes y turismo en Argentina. Descubrí los mejores destinos con nuestros paquetes de viajes. Contactanos por WhatsApp.'

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: ['viajes', 'turismo', 'Argentina', 'paquetes de viajes', 'Turismeando', 'Bariloche', 'Iguazú', 'Mendoza', 'Ushuaia', 'Salta', 'Buenos Aires', 'agencia de viajes'],
  authors: [{ name: 'Turismeando' }],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: 'Turismeando',
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: siteTitle,
    description: siteDescription,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
