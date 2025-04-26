import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/display/sidebar';
import Header from '@/components/display/header';
import { ClerkProvider } from '@clerk/nextjs';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ghoona Camp',
  description: 'Ghoona Camp Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="ja">
        <body className={outfit.className}>
          <div className="flex">
            <div className="w-[200px] transition-all duration-300">
              <Sidebar />
            </div>
            <div className="flex-1 flex flex-col max-h-screen">
              <Header />
              <main className="bg-[#EEEEEE] flex-1 min-h-[calc(100vh-60px)] p-5">
                {children}
              </main>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
