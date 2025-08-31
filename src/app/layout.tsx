import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import Providers from './providers';
import { Toaster } from '@/components/ui/sonner';
import { Layout } from 'nextra-theme-docs';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Finance Tracker - Manage Your Expenses',
  description: 'Track income, expenses, and budgets with Finance Tracker.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Providers>
            {children}
            <Toaster richColors />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
