import type { Metadata } from 'next';
import { Instrument_Serif, Bricolage_Grotesque, DM_Mono } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';
import Grain from '@/components/Grain';
import LoadingScreen from '@/components/LoadingScreen';
import SmoothScroll from '@/components/SmoothScroll';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-disp',
  display: 'swap',
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ayush Sanj — Frontend & Mobile Engineer',
  description: 'Frontend & Mobile Engineer · React, React Native, TypeScript',
  icons: { icon: '/icon.svg' },
  metadataBase: new URL('https://ayushsanj.com'),
  openGraph: {
    title: 'Ayush Sanj — Frontend & Mobile Engineer',
    description: 'Frontend & Mobile Engineer · React, React Native, TypeScript',
    url: 'https://ayushsanj.com',
    siteName: 'Ayush Sanj',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayush Sanj — Frontend & Mobile Engineer',
    description: 'Frontend & Mobile Engineer · React, React Native, TypeScript',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${bricolageGrotesque.variable} ${dmMono.variable}`}>
      <body>
        <div aria-hidden="true" style={{ position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: -100 }} />
        <div id="cursor-dot" aria-hidden="true" />
        <div id="cursor-ring" aria-hidden="true" />
        <SmoothScroll />
        <LoadingScreen />
        <Cursor />
        <Grain />
        <Nav />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
