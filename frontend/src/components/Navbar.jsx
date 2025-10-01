import { NavLink } from "react-router-dom";

function Navbar() {
  const linkStyle = ({ isActive }) => ({
    padding: "10px 20px",
    color: isActive ? "white" : "#eee",
    backgroundColor: isActive ? "#007bff" : "transparent",
    borderRadius: "4px",
    textDecoration: "none",
    fontWeight: "500",
    transition: "background 0.2s",
  });

  const logoutStyle = {
    padding: "10px 20px",
    color: "white",
    backgroundColor: "red",
    borderRadius: "4px",
    textDecoration: "none",
    fontWeight: "500",
    marginLeft: "auto",   // pushes it to the far right
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "60px",
        backgroundColor: "#333",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        gap: "12px",
        zIndex: 1000,
      }}
    >
      <NavLink to="/home" style={linkStyle}>Home</NavLink>
      <NavLink to="/appointment_booking" style={linkStyle}>Appointment Booking</NavLink>
      <NavLink to="/appointment_review" style={linkStyle}>Appointment Review</NavLink>
    
      
      {/* logout pushed to far right */}
      <NavLink to="/logout" style={logoutStyle}>Logout</NavLink>
    </nav>
  );
}

export default Navbar;
