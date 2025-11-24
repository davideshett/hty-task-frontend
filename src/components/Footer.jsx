import React from 'react'
import '../index.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>© {new Date().getFullYear()} EventBooking</div>
          <div className="small muted">Built with ❤️</div>
        </div>
      </div>
    </footer>
  )
}
