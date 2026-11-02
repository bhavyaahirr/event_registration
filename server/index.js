const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const eventsFile = path.join(__dirname, "data", "events.json");
const regFile = path.join(__dirname, "data", "registrations.json");

// ---------- helpers ----------
const read = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch (err) {
    return []; // if file is missing or empty, treat as empty list
  }
};

const write = (file, data) =>
  fs.writeFileSync(file, JSON.stringify(data, null, 2));

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;

// ---------- routes ----------
app.get("/", (req, res) => {
  res.send("Event Registration API is running");
});

// all events
app.get("/api/events", (req, res) => {
  res.json(read(eventsFile));
});

// all registrations
app.get("/api/registrations", (req, res) => {
  res.json(read(regFile));
});

// add a registration
app.post("/api/registrations", (req, res) => {
  const { name, email, phone, eventId } = req.body;

  // validation
  if (!name || name.trim().length < 3) {
    return res.status(400).json({ message: "Name must be at least 3 characters" });
  }
  if (!emailRegex.test(email || "")) {
    return res.status(400).json({ message: "Invalid email" });
  }
  if (!phoneRegex.test(phone || "")) {
    return res.status(400).json({ message: "Invalid phone number" });
  }

  const events = read(eventsFile);
  if (!events.some((e) => e.id === Number(eventId))) {
    return res.status(400).json({ message: "Event does not exist" });
  }

  const list = read(regFile);

  // same email can't register twice for the same event
  const duplicate = list.some(
    (r) => r.email.toLowerCase() === email.toLowerCase() && r.eventId === Number(eventId)
  );
  if (duplicate) {
    return res.status(409).json({ message: "Already registered for this event" });
  }

  const newReg = {
    id: Date.now(),
    name: name.trim(),
    email: email.toLowerCase(),
    phone,
    eventId: Number(eventId),
  };

  list.push(newReg);
  write(regFile, list);
  res.status(201).json(newReg);
});

// delete a registration
app.delete("/api/registrations/:id", (req, res) => {
  const id = Number(req.params.id);
  const list = read(regFile);

  if (!list.some((r) => r.id === id)) {
    return res.status(404).json({ message: "Registration not found" });
  }

  write(regFile, list.filter((r) => r.id !== id));
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));