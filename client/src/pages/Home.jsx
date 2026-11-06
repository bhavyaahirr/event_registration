import { useEvents } from "../context/EventContext";
import EventCard from "../components/EventCard";

function Home() {
  const { events, loading, error } = useEvents();

  if (loading) return <p className="msg">Loading events...</p>;
  if (error) return <p className="msg error">{error}</p>;

  // method passed as prop (syllabus: methods as props)
  const handleRegister = (id) => console.log("Selected event:", id);

  return (
    <div className="page">
      <h2>Upcoming Events</h2>
      <div className="event-grid">
        {events.map((ev) => (
          <EventCard key={ev.id} event={ev} onRegister={handleRegister} />
        ))}
      </div>
    </div>
  );
}

export default Home;