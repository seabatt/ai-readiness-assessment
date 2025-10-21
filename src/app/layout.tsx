import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import './globals.css'

const nbInternational = localFont({
  src: [
    {
      path: '../../public/fonts/NBInternationalPro-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NBInternationalPro-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/NBInternationalPro-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NBInternationalPro-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/NBInternationalPro-Book.ttf',
      weight: '450',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NBInternationalPro-BookItalic.ttf',
      weight: '450',
      style: 'italic',
    },
    {
      path: '../../public/fonts/NBInternationalPro-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NBInternationalPro-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/NBInternationalPro-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NBInternationalPro-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-nb-international',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AI Worker Readiness Blueprint | AI.work',
  description: 'Get your personalized AI Worker readiness blueprint with automation opportunities and implementation roadmap',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${nbInternational.className} bg-bg-primary text-text-primary antialiased`}>
        {children}
        
        {/* HubSpot Tracking Code */}
        <Script
          id="hs-script-loader"
          src="//js-eu1.hs-scripts.com/145411173.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
