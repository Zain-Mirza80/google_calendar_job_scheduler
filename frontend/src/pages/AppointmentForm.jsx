import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function AppointmentForm({ onSubmit, sessionToken}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    datetime: "",
    description: "",
    image: null,
    is_scheduled: false,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        if (onSubmit) {
        // If a parent provided a custom handler (e.g. session booking)
        await onSubmit(formData);
        } else if (sessionToken) {
        // Session-based booking flow
        console.log("Submitting appointment via session link");
        const response = await api.post(`/api/session/${sessionToken}/book/`, formData);
        console.log("Appointment created (session)", response);

        // Optionally mark session as used (depends on backend setup)
        await api.post(`/api/session/${sessionToken}/use/`);

        navigate("/appointment_success");
        } else {
        // Default flow: normal appointment booking
        console.log("Submitting appointment (default flow)");
        const response = await api.post("/api/job/create/", formData);
        console.log("Appointment created", response);
        navigate("/appointment_success");
        }
    } catch (error) {
        console.error("Appointment submission failed", error);
    }
    };


  // --- styles unchanged ---
  const pageStyle = {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f5f7ff 0%, #ffffff 80%)",
    display: "flex",
    padding: "120px 16px 60px",
  };

  const containerStyle = {
    maxWidth: "960px",
    margin: "0 auto",
    width: "100%",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "32px",
  };

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 14px",
    borderRadius: "999px",
    backgroundColor: "#e3e8ff",
    color: "#3b4cca",
    fontSize: "13px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  };

  const titleStyle = {
    margin: "16px 0 12px",
    fontSize: "32px",
    color: "#1d1d1f",
    fontWeight: 700,
  };

  const formCardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    border: "1px solid #d8def8",
    boxShadow: "0px 24px 60px rgba(59, 76, 202, 0.12)",
    padding: "40px",
    display: "grid",
    gap: "28px",
  };

  const formGridStyle = {
    display: "grid",
    gap: "24px",
  };

  const fieldRowStyle = {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  };

  const fieldWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const labelStyle = {
    fontSize: "13px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    color: "#6873a8",
  };

  const inputStyle = {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #c6d2fb",
    backgroundColor: "#f8fbff",
    fontSize: "15px",
    color: "#1f2933",
    boxShadow: "0 1px 2px rgba(59, 76, 202, 0.08) inset",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "120px",
    resize: "vertical",
  };

  const uploadFieldStyle = {
    ...inputStyle,
    padding: "18px 16px",
    display: "flex",
    alignItems: "center",
  };

  const helperTextStyle = {
    fontSize: "13px",
    color: "#7d86b2",
  };

  const footerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "flex-start",
  };

  const buttonStyle = {
    backgroundColor: "#3b4cca",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    padding: "14px 26px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 14px 30px rgba(59, 76, 202, 0.25)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  return (
    <div style={pageStyle}>
      <section style={containerStyle}>
        <header style={headerStyle}>
          <span style={badgeStyle}>Topflow Services</span>
          <h1 style={titleStyle}>Book Your Appointment</h1>
        </header>

        <form
          onSubmit={handleSubmit}
          onKeyDown={(event) => {
            if (event.key === "Enter" && event.target.tagName !== "TEXTAREA") {
              event.preventDefault();
            }
          }}
          style={formCardStyle}
        >
          <div style={{ ...formGridStyle, gap: "32px" }}>
            <div style={fieldRowStyle}>
              <div style={fieldWrapperStyle}>
                <label style={labelStyle} htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Jordan Miller"
                  required
                />
              </div>

              <div style={fieldWrapperStyle}>
                <label style={labelStyle} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div style={fieldWrapperStyle}>
                <label style={labelStyle} htmlFor="mobile">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>

            <div style={fieldWrapperStyle}>
              <label style={labelStyle} htmlFor="address">
                Service Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                style={textareaStyle}
                placeholder="Street, city, and any helpful landmarks"
                required
              />
            </div>

            <div style={fieldRowStyle}>
              <div style={fieldWrapperStyle}>
                <label style={labelStyle} htmlFor="datetime">
                  Preferred Date & Time
                </label>
                <input
                  id="datetime"
                  name="datetime"
                  type="datetime-local"
                  value={formData.datetime}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            <div style={fieldWrapperStyle}>
              <label style={labelStyle} htmlFor="description">
                Job Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={textareaStyle}
                placeholder="Briefly describe the work you'd like us to handle"
                required
              />
            </div>

            <div style={fieldWrapperStyle}>
              <label style={labelStyle} htmlFor="image">
                Reference Image (optional)
              </label>
              <div style={uploadFieldStyle}>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  style={{ border: "none", background: "transparent", padding: 0 }}
                />
              </div>
              <span style={helperTextStyle}>
                Attach a photo to help us prepare the right tools.
              </span>
            </div>
          </div>

          <footer style={footerStyle}>
            <button type="submit" style={buttonStyle}>
              Book Appointment
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

export default AppointmentForm;
