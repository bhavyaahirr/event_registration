import { useState } from "react";
import { useEvents } from "../context/EventContext";
import RegisterForm from "../components/RegisterForm";

function Register() {
  const { events } = useEvents();
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, eventId: Number(data.eventId) }),
      });
      const result = await res.json();
      if (res.ok) {
        setMessage({ text: "Registered successfully!", type: "success" });
        return true;
      }
      setMessage({ text: result.message || "Registration failed", type: "error" });
      return false;
    } catch (err) {
      setMessage({ text: "Server not reachable", type: "error" });
      return false;
    }
  };

  return (
    <div className="page">
      <h2>Event Registration</h2>
      {message.text && <p className={`msg ${message.type}`}>{message.text}</p>}
      <RegisterForm events={events} onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;