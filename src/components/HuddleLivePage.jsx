import { useEffect } from 'react'

export default function HuddleLivePage() {
  useEffect(function () {
    window.location.replace('/huddle.html')
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      background: '#f4f5f7',
      color: '#1a1d26',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
    }}>
      Opening High-Risk Huddle...
    </div>
  )
}
