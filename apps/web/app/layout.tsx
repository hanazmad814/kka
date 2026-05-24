import type { ReactNode } from 'react';
import './globals.css';

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
