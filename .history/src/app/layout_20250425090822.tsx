import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import "./globals.css";
import ClientLayout from "@/components/layout/client-layout";

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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
