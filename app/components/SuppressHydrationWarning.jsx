'use client'

import { useEffect } from 'react'

export default function SuppressHydrationWarning() {
  useEffect(() => {
    // Remove Grammarly attributes that cause hydration mismatches
    const removeGrammarlyAttributes = () => {
      const body = document.body
      if (body) {
        body.removeAttribute('data-new-gr-c-s-check-loaded')
        body.removeAttribute('data-gr-ext-installed')
      }
    }

    // Remove attributes after hydration
    removeGrammarlyAttributes()

    // Also remove them periodically in case Grammarly re-adds them
    const interval = setInterval(removeGrammarlyAttributes, 1000)

    return () => clearInterval(interval)
  }, [])

  return null
}
