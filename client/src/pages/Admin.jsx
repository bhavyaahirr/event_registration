import { useEffect, useState } from "react";
import { useEvents } from "../context/EventContext";
import "./Admin.css";

function Admin() {
  const { events, registrations, loading, error, fetchRegistrations, deleteRegistration } =
    useEvents();

  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("all");

  // refresh the list every time admin opens
  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const getEventTitle = (id) => events.find((e) => e.id === id)?.title || "Unknown";

  // search + filter using array methods
  const filtered = registrations.filter((r) => {
    const q = search.toLowerCase();
    const matchesSearch =
      r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q);
    const matchesEvent = eventFilter === "all" || r.eventId === Number(eventFilter);
    return matchesSearch && matchesEvent;
  });

  // count per event using reduce
  const counts = registrations.reduce((acc, r) => {
    acc[r.eventId] = (acc[r.eventId] || 0) + 1;
    return acc;
  }, {});

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete registration of ${name}?`)) {
      deleteRegistration(id);
    }
  };

  if (loading) return <p className="admin-msg">Loading...</p>;
  if (error) return <p className="admin-msg error">{error}</p>;

  return (
    <div className="admin">
      <h2>Admin Dashboard</h2>

      <div className="stats">
        <div className="stat-card">
          <h3>{registrations.length}</h3>
          <p>Total Registrations</p>
        </div>
        {events.map((ev) => (
          <div className="stat-card" key={ev.id}>
            <h3>{counts[ev.id] || 0}</h3>
            <p>{ev.title}</p>
          </div>
        ))}
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={eventFilter} onChange={(e) => setEventFilter(e.target.value)}>
          <option value="all">All events</option>
          {events.map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.title}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="admin-msg">No registrations found.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Event</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, index) => (
                <tr key={r.id}>
                  <td>{index + 1}</td>
                  <td>{r.name}</td>
                  <td>{r.email}</td>
                  <td>{r.phone}</td>
                  <td>{getEventTitle(r.eventId)}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(r.id, r.name)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admin;