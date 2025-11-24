import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { EventAPI } from "../api/api";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");

  // Pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchEvents() {
    try {
      setLoading(true);
      setError(null);

      const query = {
        pageNumber,
        pageSize,
        title,
        location,
        eventDate,
      };

      const data = await EventAPI.getEvents(query);

      setEvents(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, [pageNumber, pageSize]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPageNumber(1);
      fetchEvents();
    }, 500);

    return () => clearTimeout(delay);
  }, [title, location, eventDate]);

  const nextPage = () =>
    pageNumber < totalPages && setPageNumber(pageNumber + 1);

  const prevPage = () =>
    pageNumber > 1 && setPageNumber(pageNumber - 1);

  return (
    <div>
      <header className="page-header">
        <h1>Upcoming Events</h1>
        <p className="small muted">
          Browse, search, and book your next event.
        </p>
      </header>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <input
          className="input"
          placeholder="Search title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 1 }}
        />
        <input
          className="input"
          placeholder="Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ flex: 1 }}
        />
        <input
          type="date"
          className="input"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          style={{ flex: 1 }}
        />
        <select
          className="input"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageNumber(1);
          }}
          style={{ width: 120 }}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>

      {/* Event Cards */}
      {loading && <div>Loading events...</div>}
      {error && <div style={{ color: "#dc2626" }}>{error}</div>}

      {!loading && events.length === 0 && (
        <p className="muted" style={{ marginTop: 20 }}>
          No events found.
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "16px",
        }}
      >
        {events.map((ev) => {
          const dateObj = new Date(ev.eventDate);
          const isFull =
            ev.capacity && ev.bookingsCount >= ev.capacity;

          return (
            <div
              key={ev.id}
              className="card"
              style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3>{ev.title}</h3>
                <p className="small muted">{ev.location}</p>
                <p className="small muted">
                  {dateObj.toLocaleString()}
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    color: isFull ? "#dc2626" : "#16a34a",
                  }}
                >
                  {isFull ? "Full" : "Open"}
                </p>
              </div>

              <Link
                to={`/events/${ev.id}`}
                className={`btn ${
                  isFull ? "btn-outline" : "btn-primary"
                }`}
                style={{ marginTop: "12px" }}
              >
                {isFull ? "View" : "Book"}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "24px",
          marginBottom: "40px",
        }}
      >
        <button
          className="btn btn-outline"
          disabled={pageNumber === 1}
          onClick={prevPage}
        >
          Previous
        </button>
        <span style={{ padding: "0.5rem", fontWeight: "bold" }}>
          Page {pageNumber} of {totalPages}
        </span>
        <button
          className="btn btn-outline"
          disabled={pageNumber === totalPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
