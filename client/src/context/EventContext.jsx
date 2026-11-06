import { createContext, useContext, useReducer, useEffect, useCallback } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const EventContext = createContext();

const initialState = {
  events: [],
  registrations: [],
  loading: true,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_EVENTS":
      return { ...state, events: action.payload };
    case "SET_REGISTRATIONS":
      return { ...state, registrations: action.payload, loading: false, error: "" };
    case "DELETE_REGISTRATION":
      return {
        ...state,
        registrations: state.registrations.filter((r) => r.id !== action.payload),
      };
    case "ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function EventProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch(`${API}/events`);
      const data = await res.json();
      dispatch({ type: "SET_EVENTS", payload: data });
    } catch (err) {
      dispatch({ type: "ERROR", payload: "Could not load events" });
    }
  }, []);

  const fetchRegistrations = useCallback(async () => {
    try {
      const res = await fetch(`${API}/registrations`);
      const data = await res.json();
      dispatch({ type: "SET_REGISTRATIONS", payload: data });
    } catch (err) {
      dispatch({ type: "ERROR", payload: "Could not load registrations" });
    }
  }, []);

  const deleteRegistration = useCallback(async (id) => {
    try {
      await fetch(`${API}/registrations/${id}`, { method: "DELETE" });
      dispatch({ type: "DELETE_REGISTRATION", payload: id });
    } catch (err) {
      dispatch({ type: "ERROR", payload: "Could not delete registration" });
    }
  }, []);

  // load data once when the app starts
  useEffect(() => {
    fetchEvents();
    fetchRegistrations();
  }, [fetchEvents, fetchRegistrations]);

  const value = {
    ...state,
    fetchEvents,
    fetchRegistrations,
    deleteRegistration,
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}

// custom hook so components just call useEvents()
export function useEvents() {
  return useContext(EventContext);
}