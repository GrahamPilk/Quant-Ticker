'use client'

import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import LogoutButton from './LogoutButton'

export default function NavBar() {
  const { user, isAuthenticated, loading } = useAuth()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link href="/" className="navbar-logo">
            QuantTicker
          </Link>
        </div>
        <div className="navbar-menu">
          <Link href="/Services/ai" className="navbar-link">
            AI Services
          </Link>
          <Link href="/Services/payment" className="navbar-link">
            Payment
          </Link>
          <Link href="/Gen/account" className="navbar-link">
            Account
          </Link>
          
          {loading ? (
            <div className="navbar-link">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            </div>
          ) : isAuthenticated && user ? (
            <div className="flex items-center space-x-4">
              <span className="text-white text-sm">
                Welcome, {user.email?.split('@')[0]}
              </span>
              <LogoutButton />
            </div>
          ) : (
            <Link href="/login" className="navbar-link">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
