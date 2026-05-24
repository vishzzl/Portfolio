import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google';
import CustomCursor from '@/components/CustomCursor';
import GrainEffect from '@/components/GrainEffect';
import ScrollProvider from '@/components/ScrollProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-terminal',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Vishal — Full Stack + AI Engineer',
    template: '%s | Vishal',
  },
  description:
    'Independent systems architect building scalable cloud-native platforms, intelligent AI workflows, and enterprise-grade digital experiences.',
  metadataBase: new URL('https://vishal-portfolio.vercel.app'),
  applicationName: 'Vishal Portfolio',
  authors: [{ name: 'Vishal Vishwakarma', url: 'https://www.linkedin.com/in/vishzzl/' }],
  creator: 'Vishal Vishwakarma',
  keywords: [
    'Full Stack Engineer',
    'AI Engineer',
    'Next.js',
    'Azure',
    'Cloud Architecture',
    'RAG',
    'Portfolio',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Vishal — Full Stack + AI Engineer',
    description:
      'Independent systems architect building scalable cloud-native platforms, intelligent AI workflows, and enterprise-grade digital experiences.',
    url: '/',
    siteName: 'Vishal Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vishal — Full Stack + AI Engineer Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vishal — Full Stack + AI Engineer',
    description:
      'Independent systems architect building scalable cloud-native platforms, intelligent AI workflows, and enterprise-grade digital experiences.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FAF9F6',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${jetbrains.variable}`}>
      <body className="font-sans bg-brand-bg text-brand-dark antialiased">
        <ScrollProvider />
        <GrainEffect />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
