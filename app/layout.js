import './globals.css'
import '@rainbow-me/rainbowkit/styles.css';

import { Inter } from 'next/font/google'
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tanjiro',
  description: 'Learn Japanese characters Hiragana and Katakana',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
