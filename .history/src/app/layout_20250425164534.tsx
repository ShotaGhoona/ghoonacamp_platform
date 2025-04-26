import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextAuthProvider } from '@/providers/NextAuthProvider';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GhoonaCamp',
  description: '朝活を通じて、新しい習慣を作りましょう',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <NextAuthProvider>
          <Header />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
