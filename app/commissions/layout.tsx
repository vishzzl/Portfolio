import type { Metadata } from 'next';
import { Instrument_Serif } from 'next/font/google';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Work With Me | Vishal',
  description:
    'I help businesses, founders, and teams turn ideas into products people enjoy using.',
  alternates: {
    canonical: '/commissions',
  },
  openGraph: {
    title: 'Work With Me | Vishal',
    description:
      'I help businesses, founders, and teams turn ideas into products people enjoy using.',
    url: '/commissions',
  },
};

export default function CommissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={instrumentSerif.variable}>
      {children}
    </div>
  );
}
