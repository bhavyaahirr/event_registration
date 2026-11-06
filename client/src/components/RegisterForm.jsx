import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;

function RegisterForm({ events, onSubmit }) {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventId: searchParams.get("event") || "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error while typing
  }, []);

  const validate = () => {
    const { name, email, phone, eventId } = form;
    const err = {};
    if (name.trim().length < 3) err.name = "Name must be at least 3 characters";
    if (!emailRegex.test(email)) err.email = "Enter a valid email address";
    if (!phoneRegex.test(phone)) err.phone = "Enter a valid 10-digit mobile number";
    if (!eventId) err.eventId = "Please select an event";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setSubmitting(true);
    const ok = await onSubmit(form);
    setSubmitting(false);
    if (ok) setForm({ name: "", email: "", phone: "", eventId: "" });
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="name">Full Name</label>
      <input
        id="name"
        name="name"
        placeholder="e.g. Riya Patel"
        value={form.name}
        onChange={handleChange}
        className={errors.name ? "invalid" : ""}
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={handleChange}
        className={errors.email ? "invalid" : ""}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <label htmlFor="phone">Phone</label>
      <input
        id="phone"
        name="phone"
        placeholder="10-digit mobile number"
        maxLength={10}
        value={form.phone}
        onChange={handleChange}
        className={errors.phone ? "invalid" : ""}
      />
      {errors.phone && <p className="error">{errors.phone}</p>}

      <label htmlFor="eventId">Event</label>
      <select
        id="eventId"
        name="eventId"
        value={form.eventId}
        onChange={handleChange}
        className={errors.eventId ? "invalid" : ""}
      >
        <option value="">Select an event</option>
        {events.map((ev) => (
          <option key={ev.id} value={ev.id}>{ev.title}</option>
        ))}
      </select>
      {errors.eventId && <p className="error">{errors.eventId}</p>}

      <button type="submit" className="btn" disabled={submitting}>
        {submitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
}

export default RegisterForm;