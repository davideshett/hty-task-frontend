import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { BookingAPI } from '../api/api'
import '../index.css'

export default function BookingForm({ eventId }) {
  const { user, token } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage(null)

    if (!name || !email) {
      return setMessage({ type: 'error', text: 'Name and email are required.' })
    }

    if (!token) {
      return setMessage({ type: 'error', text: 'You must be logged in to book.' })
    }

    setLoading(true)

    try {
      await BookingAPI.createBooking({
        eventId,
        name,
        email,
        note,
      })

      setMessage({ type: 'success', text: 'Booking submitted successfully.' })
      setNote('')
      setName(user?.name || '')
      setEmail(user?.email || '')
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 480 }}>
      <div className="form">
        <label className="small muted">Name</label>
        <input className="input" value={name} onChange={e => setName(e.target.value)} />

        <label className="small muted">Email</label>
        <input
          className="input"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={!!user?.email}
        />

        <label className="small muted">Note</label>
        <textarea
          className="textarea"
          value={note}
          onChange={e => setNote(e.target.value)}
        />

        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit" disabled={loading || !token} className="btn btn-primary">
            {loading ? 'Saving...' : 'Submit Booking'}
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              setName(user?.name || '')
              setEmail(user?.email || '')
              setNote('')
            }}
          >
            Reset
          </button>
        </div>

        {message && (
          <div
            style={{
              color: message.type === 'error' ? 'var(--danger)' : 'var(--success)',
              marginTop: 8,
            }}
          >
            {message.text}
          </div>
        )}
      </div>
    </form>
  )
}
