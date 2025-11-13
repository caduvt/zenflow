import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { TaskProvider } from '@/hooks/TaskContext';
import { ThemeProvider } from 'next-themes';
import { THEME_STORAGE } from '@/Constants';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'zenflow',
  description: 'your tasks, under your control',
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
        <ThemeProvider
          storageKey={THEME_STORAGE}
          defaultTheme="system"
          enableSystem
          attribute="class"
        >
          <TaskProvider>{children}</TaskProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
