import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { AuthAPI } from "../api/api";
import '../index.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [mode, setMode] = useState('login')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/events'

  function validateEmail(e) {
    return /^\S+@\S+\.\S+$/.test(e)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!email) return setError('Email is required')
    if (!validateEmail(email)) return setError('Enter a valid email')
    if (!password) return setError('Password is required')

    try {
      
      if (mode === 'login') {
        const data = await AuthAPI.login({ email, password })

        login({ email, token: data.token })
        navigate(from)
        return
      }

      
      if (!firstName) return setError('First name is required')
      if (!lastName) return setError('Last name is required')
      if (password.length < 8) return setError('Password must be at least 8 characters')
      if (!/\d/.test(password)) return setError('Password must contain at least one special character')
      if (password !== confirmPassword) return setError('Passwords do not match')

      
      const data = await AuthAPI.register({
        email,
        password,
        firstName,
        lastName
      })

      const fullName = `${firstName} ${lastName}`
      login({ email, name: fullName, token: data.token })
      navigate(from)

    } catch (err) {
      setError(err.message || "Request failed")
    }
  }

  return (
    <div className="container">
      <div className="auth-grid">

        {/* Left side */}
        <div className="auth-illustration">
          <div className="auth-hero">
            <h3>Welcome to EventBooking</h3>
            <p>Discover and book events easily. Manage your bookings and stay organised.</p>
          </div>
        </div>

        {/* Right side */}
        <div className="card auth-card">
          <div style={{ display: 'flex', justifyContent:'space-between', alignItems:'center' }}>
            <h2>{mode === 'login' ? 'Login' : 'Create account'}</h2>
            {mode === 'login' ? (
              <button className="btn btn-link" onClick={() => { setMode('signup'); setError(null) }}>Sign up</button>
            ) : (
              <button className="btn btn-link" onClick={() => { setMode('login'); setError(null) }}>Login</button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="form" style={{ marginTop: 10 }}>
            {mode === 'signup' && (
              <>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <label className="small muted">First name</label>
                    <input className="input" value={firstName} onChange={e => setFirstName(e.target.value)} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="small muted">Last name</label>
                    <input className="input" value={lastName} onChange={e => setLastName(e.target.value)} />
                  </div>
                </div>

                <label className="small muted" style={{ marginTop: 6 }}>Email</label>
                <input className="input" value={email} onChange={e => setEmail(e.target.value)} />

                <label className="small muted">Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#666'
                    }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <label className="small muted">Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="input"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#666'
                    }}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </>
            )}

            {mode === 'login' && (
              <>
                <label className="small muted">Email</label>
                <input className="input" value={email} onChange={e => setEmail(e.target.value)} />

                <label className="small muted">Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#666'
                    }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </>
            )}

            {error && (
              <div style={{ color: '#dc2626', marginTop: 6 }}>{error}</div>
            )}

            <button type="submit" className="btn btn-primary" style={{ marginTop: 10 }}>
              {mode === 'login' ? 'Login' : 'Create account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
