import type { Metadata } from 'next'
import localFont from 'next/font/local'
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
  title: 'IT Automation Readiness Assessment | AI.work',
  description: 'Assess your IT team\'s readiness for AI Workers and autonomous operations',
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
      </body>
    </html>
  )
}
