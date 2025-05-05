import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import { UserProvider } from '@/contexts/UserContext'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Moody',
  description: 'Track your daily moods and emotions',
  icons: {
    icon: [
      { url: '/assets/images/Logo icon.svg', type: 'image/svg+xml' },
      { url: '/assets/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: { url: '/assets/images/Logo icon.svg', type: 'image/svg+xml' },
  },
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/Logo icon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/assets/images/favicon-32x32.png" type="image/png" />
      </head>
      <body className={`${inter.className} min-h-screen bg-gradient-custom`}>
        <AuthProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
