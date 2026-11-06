import { useState, useCallback } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;

function RegisterForm({ events, onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", eventId: "" });
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validate = () => {
    const { name, email, phone, eventId } = form;
    const err = {};
    if (name.trim().length < 3) err.name = "Name must be at least 3 characters";
    if (!emailRegex.test(email)) err.email = "Enter a valid email";
    if (!phoneRegex.test(phone)) err.phone = "Enter a valid 10-digit phone number";
    if (!eventId) err.eventId = "Please select an event";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      const ok = await onSubmit(form);
      if (ok) setForm({ name: "", email: "", phone: "", eventId: "" });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label>Full Name</label>
      <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} />
      {errors.name && <p className="error">{errors.name}</p>}

      <label>Email</label>
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      {errors.email && <p className="error">{errors.email}</p>}

      <label>Phone</label>
      <input name="phone" placeholder="10-digit phone" value={form.phone} onChange={handleChange} />
      {errors.phone && <p className="error">{errors.phone}</p>}

      <label>Event</label>
      <select name="eventId" value={form.eventId} onChange={handleChange}>
        <option value="">Select event</option>
        {events.map((ev) => (
          <option key={ev.id} value={ev.id}>{ev.title}</option>
        ))}
      </select>
      {errors.eventId && <p className="error">{errors.eventId}</p>}

      <button type="submit" className="btn">Register</button>
    </form>
  );
}

export default RegisterForm;