import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";
import AppointmentForm from "./AppointmentForm"; // reuse your existing form

function AppointmentFormStandalone() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [valid, setValid] = useState(null);

  // Step 1: Validate token on load
  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await api.get(`/api/session/${token}/validate/`);
        if (res.data.valid) {
          setValid(true);
        } else {
          navigate("/session/expired");
        }
      } catch (err) {
        console.error("Session check failed", err);
        navigate("/session/expired");
      }
    };
    checkToken();
  }, [token, navigate]);

  // Step 2: Handle form submission specifically for sessions
  const handleSubmit = async (formData) => {
    try {
      const res = await api.post(`/api/session/${token}/book/`, formData);
      console.log("Booking success", res.data);
      navigate("/appointment_success");
    } catch (err) {
      console.error("Booking failed", err);
      navigate("/session/expired"); // if invalid or used already
    }
  };

  if (valid === null) return <p>Loading...</p>;
  if (!valid) return null;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Book Your Appointment</h1>
      {/* Reuse existing form but override submit behaviour */}
      <AppointmentForm onSubmit={handleSubmit} sessionToken={token}/>
    </div>
  );
}

export default AppointmentFormStandalone;
