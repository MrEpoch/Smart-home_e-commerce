import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './header';
import Footer from './footer';
import { Suspense } from 'react';
import Loading from './loading';
import { getCart } from '@/lib/api';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-Commerce Site',
  description: 'A sample e-commerce site built with Next.js',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const cart = await getCart();

  return (
    <html lang="en">
      <body className={inter.className}>
         <Header cart={cart} />
         <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
        <Footer />
      </body>
    </html>
  )
}

