import type { Metadata } from 'next';
import { Bricolage_Grotesque, DM_Mono } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

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
  title: 'Ayush Sanj — Software Engineer · Frontend Focus',
  description: 'Ayush Sanj is a software engineer focused on polished, responsive web and mobile experiences with React, TypeScript, and React Native, with growing experience in backend development.',
  icons: { icon: '/icon.svg' },
  metadataBase: new URL('https://ayushsanj.com'),
  openGraph: {
    title: 'Ayush Sanj — Software Engineer · Frontend Focus',
    description: 'Ayush Sanj is a software engineer focused on polished, responsive web and mobile experiences with React, TypeScript, and React Native, with growing experience in backend development.',
    url: 'https://ayushsanj.com',
    siteName: 'Ayush Sanj',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayush Sanj — Software Engineer · Frontend Focus',
    description: 'Ayush Sanj is a software engineer focused on polished, responsive web and mobile experiences with React, TypeScript, and React Native, with growing experience in backend development.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolageGrotesque.variable} ${dmMono.variable}`}>
      <body>
        <Nav />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
