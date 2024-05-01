import './globals.css';

import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import SideBar from '@/components/SideBar';
import { siteConf } from '@/config/sites';
import ModalProvider from '@/providers/ModalProvider';
import SupaBaseProvider from '@/providers/SupaBaseProvider';
import ToastProvider from '@/providers/ToastProvider';
import UseProvider from '@/providers/UseProvider';

const fontStyle = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteConf.name,
    template: `%s | ${siteConf.name}`,
  },
  description: siteConf.description,
  icons: [
    {
      url: '/',
      href: '/icon/spoti2.png',
    },
  ],
  authors: [
    {
      name: siteConf.name,
    },
  ],
  robots: {
    index: true,
    follow: true,
  },
  creator: siteConf.creator,
  publisher: siteConf.publisher,
  referrer: 'origin',
  applicationName: siteConf.applicationName,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontStyle.className}>
        <ToastProvider />
        <SupaBaseProvider>
          <UseProvider>
            <ModalProvider />
            <SideBar>{children}</SideBar>
          </UseProvider>
        </SupaBaseProvider>
      </body>
    </html>
  );
}
