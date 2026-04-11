import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Header } from './components/header/header';
import { Footer } from './components/footer';

import './globals.css';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Layer Streetwear',
  description:
    'Modern streetwear clothing brand. Clean design, premium materials, and everyday essentials inspired by urban culture.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} font-sans flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
