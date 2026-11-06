import { Link } from "react-router-dom";

function EventCard({ event, onRegister }) {
  const { id, title, date, venue } = event;
  const d = new Date(date);
  const month = d.toLocaleString("en-US", { month: "short" });
  const day = d.getDate();

  return (
    <div className="event-card">
      <div className="event-top">
        <div className="date-badge">
          <span>{month}</span>
          <strong>{day}</strong>
        </div>
        <h3>{title}</h3>
      </div>
      <p>📍 {venue}</p>
      <Link to={`/register?event=${id}`} className="btn" onClick={() => onRegister(id)}>
        Register Now
      </Link>
    </div>
  );
}

export default EventCard;