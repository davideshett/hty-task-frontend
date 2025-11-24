import React from 'react'
import '../index.css'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="nav" aria-label="Main navigation">
      <div className="container nav-inner">
        <Link to="/events" className="brand" aria-label="EventBooking home">
          <img src={logo} alt="EventBooking" className="brand-logo" />
          <span className="brand-text">EventBooking</span>
        </Link>

        <div className="nav-links" role="navigation" aria-label="Primary links">
          <Link to="/events">Events</Link>
          {user ? (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {/* Show name if available, otherwise fallback to email */}
              <span className="small">{user.name ? user.name : user.email}</span>
              <button onClick={logout} className="btn">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
