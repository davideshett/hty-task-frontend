import React from 'react'
import './index.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import EventList from './pages/EventList'
import EventDetail from './pages/EventDetail'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem', flex: 1 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/events" replace />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/protected" element={<ProtectedRoute><div className="card">Protected</div></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

