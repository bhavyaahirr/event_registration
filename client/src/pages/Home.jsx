import { Link } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import EventCard from "../components/EventCard";

function Home() {
  const { events, loading, error } = useEvents();

  // method passed as prop
  const handleRegister = (id) => console.log("Selected event:", id);

  return (
    <>
      <section className="hero">
        <h1>Discover &amp; Join College Events</h1>
        <p>Hackathons, cultural nights and quizzes. Pick an event and register in under a minute.</p>
        <Link to="/register" className="btn">Register Now</Link>
      </section>

      <div className="page">
        <h2>Upcoming Events</h2>
        <p className="subtitle">Choose an event and reserve your seat.</p>

        {loading && <p className="loader">Loading events...</p>}
        {error && <p className="msg error">{error}</p>}
        {!loading && !error && events.length === 0 && (
          <p className="loader">No events available right now.</p>
        )}

        <div className="event-grid">
          {events.map((ev) => (
            <EventCard key={ev.id} event={ev} onRegister={handleRegister} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;