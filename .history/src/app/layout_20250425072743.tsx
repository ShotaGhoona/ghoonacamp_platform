import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/display/sidebar';
import Header from '@/components/display/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ghoona Camp',
  description: 'Morning routine & growth community platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={inter.className}>
      <body className="flex">
        {/* Left nav */}
        <Sidebar />

        {/* Right content area */}
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 px-6 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
