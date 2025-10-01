import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import AppointmentForm from "./pages/AppointmentForm";
import AppointmentReview from "./pages/AppointmentReview";
import AppointmentSuccess from "./pages/AppointmentSuccess";

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
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/logout" element={<Logout />} />
        

        {/* Protected parent (Layout is wrapped in ProtectedRoute) */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/appointment_booking" element={<AppointmentForm />} />
          <Route path="/appointment_review" element={<AppointmentReview />} />
          <Route path="/appointment_success" element={<AppointmentSuccess />} />

          {/* future protected routes go here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
