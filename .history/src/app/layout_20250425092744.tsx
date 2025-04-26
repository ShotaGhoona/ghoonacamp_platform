import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/display/sidebar';
import Header from '@/components/display/header';
import { AuthProvider } from './providers';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="ja">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex">
            <div className="w-[200px] transition-all duration-300">
              <Sidebar />
            </div>
            <div className="flex-1 flex flex-col min-h-screen">
              <Header />
              <main className=" bg-[#EEEEEE] flex-1 px-6 py-6">{children}</main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
