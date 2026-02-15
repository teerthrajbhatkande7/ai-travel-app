import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Header from "@/components/Header";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RoamEasy | Your AI Travel Companion',
  description: 'Get AI-powered travel recommendations, tourist places, and smart tips for any city in the world.',
  icons: {
    icon: '/favicon.ico', // We don't have a real favicon yet, but this is standard
  }
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <Header />
        {children}
      </body>

    </html>
  );
}
