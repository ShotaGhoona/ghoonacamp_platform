import './globals.css';
import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import Sidebar from '@/components/display/sidebar';
import Header from '@/components/display/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ghoona Camp',
  description: 'Morning routine & growth community platform',
};

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={outfit.className}>
      <body className="flex">
        <div className="w-[200px] transition-all duration-300">
          <Sidebar />
        </div>

        {/* Right content area */}
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 px-6 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
