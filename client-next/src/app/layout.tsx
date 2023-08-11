import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './header';
import Footer from './footer';
import { Suspense } from 'react';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-Commerce Site',
  description: 'A sample e-commerce site built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
         <Header />
         <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
        <Footer />
      </body>
    </html>
  )
}

