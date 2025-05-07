'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'


export default function Home() {
  const router = useRouter()
  const { currentUser, loading } = useAuth()

  useEffect(() => {
    // Wait until authentication is checked
    if (!loading) {
      if (currentUser) {
        // If user is authenticated, redirect to dashboard
        router.push('/dashboard')
      } else {
        // If user is not authenticated, redirect to login
        router.push('/login')
      }
    }
  }, [currentUser, loading, router])

  // Show loading state while checking authentication or redirecting
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-custom">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-neutral-900 font-reddit text-lg">Loading...</p>
          </div>
        </div>
  )
}
