'use client'

import { useAuth } from './contexts/AuthContext'
import Link from 'next/link'
import ClientOnly from './components/ClientOnly'

function HomeContent() {
  const { user, isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <main className="main-content">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </main>
    )
  }

  return (
    <main className="main-content">
      <div className="hero-section">
        <h1>Welcome to QuantTicker</h1>
        {isAuthenticated && user ? (
          <p className="hero-subtitle">
            Welcome back, {user.email?.split('@')[0]}! Ready to trade?
          </p>
        ) : (
          <p className="hero-subtitle">Your premier quantitative trading platform powered by AI</p>
        )}
        
        <div className="hero-features">
          <div className="feature-card">
            <h3>AI-Powered Analysis</h3>
            <p>Advanced machine learning algorithms for market prediction and analysis</p>
          </div>
          <div className="feature-card">
            <h3>Real-Time Trading</h3>
            <p>Execute trades with lightning-fast speed and precision</p>
          </div>
          <div className="feature-card">
            <h3>Risk Management</h3>
            <p>Sophisticated risk assessment and portfolio optimization tools</p>
          </div>
        </div>
        
        <div className="cta-buttons">
          {isAuthenticated ? (
            <>
              <Link href="/Services/ai" className="btn-primary">
                Start Trading
              </Link>
              <Link href="/Gen/account" className="btn-secondary">
                View Account
              </Link>
            </>
          ) : (
            <>
              <Link href="/signup" className="btn-primary">
                Get Started
              </Link>
              <Link href="/login" className="btn-secondary">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <ClientOnly fallback={
      <main className="main-content">
        <div className="hero-section">
          <h1>Welcome to QuantTicker</h1>
          <p className="hero-subtitle">Your premier quantitative trading platform powered by AI</p>
          <div className="hero-features">
            <div className="feature-card">
              <h3>AI-Powered Analysis</h3>
              <p>Advanced machine learning algorithms for market prediction and analysis</p>
            </div>
            <div className="feature-card">
              <h3>Real-Time Trading</h3>
              <p>Execute trades with lightning-fast speed and precision</p>
            </div>
            <div className="feature-card">
              <h3>Risk Management</h3>
              <p>Sophisticated risk assessment and portfolio optimization tools</p>
            </div>
          </div>
          <div className="cta-buttons">
            <Link href="/signup" className="btn-primary">
              Get Started
            </Link>
            <Link href="/login" className="btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </main>
    }>
      <HomeContent />
    </ClientOnly>
  );
}
