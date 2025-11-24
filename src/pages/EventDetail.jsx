import React, { useEffect, useState } from "react"
import "../index.css"
import { useParams, Link } from "react-router-dom"
import BookingForm from "../components/BookingForm"
import { EventAPI } from "../api/api"
import { useAuth } from "../context/AuthContext"

export default function EventDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await EventAPI.getEventById(id)
        setEvent(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div style={{ color: '#dc2626' }}>{error}</div>

  const eventDate = new Date(event.eventDate)
  const isFull = event.capacity && event.bookingsCount >= event.capacity

  return (
    <div className="card" style={{ position: "relative" }}>
      <Link to="/events">
        <button
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            border: "none",
            background: "transparent",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "#dc2626",
          }}
        >
          &times;
        </button>
      </Link>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "60%" }}> 
        <div> 

        {/* Title */} 
        <h1 style={{ margin: 0 }}>{event.title}</h1> 
        
        {/* Event Date/Time */} 
        <div className="small muted">Date/Time: {eventDate.toLocaleString()}</div> 
        
        {/* Location */} 
        <div className="small muted">Location: {event.location}</div> 
        
        {/* Capacity */} 
        <div className="small muted">Capacity: {event.capacity}</div> 
        
        {/* Summary */} 
        <div className="prose" style={{ marginTop: "1rem" }} dangerouslySetInnerHTML={{ __html: event.summary }} /> </div> 
        </div>
        
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: "1.5rem" }}>
        {user ? (
          <BookingForm eventId={event.id} />
        ) : (
          <Link to="/login" className="link" state={{ from: `/events/${event.id}` }}>
            Login to book
          </Link>
        )}

        {isFull && <div style={{ color: '#dc2626', fontWeight: 'bold' }}>Event Full</div>}
      </div>
    </div>
  )
}
