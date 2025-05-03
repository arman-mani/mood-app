import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Layout } from '@/components'
import type { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mood Tracker',
  description: 'Track your daily moods and emotions',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
