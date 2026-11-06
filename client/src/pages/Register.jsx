import { useState, useEffect } from "react";
import { useEvents } from "../context/EventContext";
import RegisterForm from "../components/RegisterForm";

function Register() {
  const { events } = useEvents();
  const [message, setMessage] = useState({ text: "", type: "" });

  // message disappears after 4 seconds
  useEffect(() => {
    if (!message.text) return;
    const t = setTimeout(() => setMessage({ text: "", type: "" }), 4000);
    return () => clearTimeout(t);
  }, [message]);

  const handleSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, eventId: Number(data.eventId) }),
      });
      const result = await res.json();
      if (res.ok) {
        setMessage({ text: "🎉 Registered successfully! See you at the event.", type: "success" });
        return true;
      }
      setMessage({ text: result.message || "Registration failed", type: "error" });
      return false;
    } catch (err) {
      setMessage({ text: "Server not reachable. Please try again.", type: "error" });
      return false;
    }
  };

  return (
    <div className="page">
      <h2>Event Registration</h2>
      <p className="subtitle">Fill in your details to reserve your spot.</p>

      {message.text && <p className={`msg ${message.type}`}>{message.text}</p>}

      <div className="register-layout">
        <RegisterForm events={events} onSubmit={handleSubmit} />
        <div className="info-box">
          <h3>Before you register</h3>
          <ul>
            <li>Use a valid email address</li>
            <li>Enter a 10-digit Indian mobile number</li>
            <li>One registration per event per email</li>
            <li>Check your event date and venue</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Register;