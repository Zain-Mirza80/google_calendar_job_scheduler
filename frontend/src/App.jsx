import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import AppointmentForm from "./pages/AppointmentForm";
import AppointmentReview from "./pages/AppointmentReview";
import AppointmentSuccess from "./pages/AppointmentSuccess";

// Session booking flow
import AppointmentFormStandalone from "./pages/AppointmentFormStandalone";
import SessionLinkGenerator from "./pages/SessionLinkGenerator";
import SessionExpired from "./pages/SessionExpired";

function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public auth routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/appointment_success" element={<AppointmentSuccess />} />

        {/* Public standalone booking via session link */}
        <Route path="/book/:token" element={<AppointmentFormStandalone />} />
        <Route path="/session-expired" element={<SessionExpired />} />

        {/* Protected parent (Layout is wrapped in ProtectedRoute) */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          {/* <Route path="/appointment_booking" element={<AppointmentForm />} /> */}
          <Route path="/appointment_review" element={<AppointmentReview />} />
          

          {/* Plumber-only route to generate links */}
          <Route path="/generate-session" element={<SessionLinkGenerator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
