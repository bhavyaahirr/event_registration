import { Link } from "react-router-dom";

function EventCard({ event, onRegister }) {
  const { id, title, date, venue } = event; // destructuring props
  return (
    <div className="event-card">
      <h3>{title}</h3>
      <p>📅 {date}</p>
      <p>📍 {venue}</p>
      <Link to="/register" className="btn" onClick={() => onRegister(id)}>
        Register
      </Link>
    </div>
  );
}

export default EventCard;