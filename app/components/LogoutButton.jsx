'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from '../Services/supabase/auth'

export default function LogoutButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setLoading(true)
    try {
      const result = await signOut()
      if (result.success) {
        router.push('/login')
        router.refresh()
      } else {
        console.error('Error signing out:', result.error)
      }
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="navbar-link bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
    >
      {loading ? 'Signing out...' : 'Sign out'}
    </button>
  )
}
