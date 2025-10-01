import { useNavigate } from "react-router-dom";

function AppointmentSuccess() {
  const navigate = useNavigate();

  const pageStyle = {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f5f7ff 0%, #ffffff 80%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 16px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "520px",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    border: "1px solid #d8def8",
    boxShadow: "0px 24px 60px rgba(59, 76, 202, 0.12)",
    padding: "48px 40px",
    textAlign: "center",
    display: "grid",
    gap: "28px",
  };

  const badgeStyle = {
    width: "72px",
    height: "72px",
    margin: "0 auto",
    borderRadius: "50%",
    background: "rgba(72, 255, 0, 1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontSize: "34px",
    fontWeight: 700,
    boxShadow: "0 18px 40px rgba(59, 76, 202, 0.25)",
  };

  const titleStyle = {
    margin: 0,
    fontSize: "30px",
    fontWeight: 700,
    color: "#1d1d1f",
  };

  const messageStyle = {
    margin: 0,
    fontSize: "16px",
    color: "#5f6368",
    lineHeight: 1.7,
  };

  const actionGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const primaryButtonStyle = {
    backgroundColor: "#3b4cca",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    padding: "14px 24px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 14px 30px rgba(59, 76, 202, 0.25)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  const secondaryButtonStyle = {
    backgroundColor: "transparent",
    color: "#3b4cca",
    border: "1px solid #b8c3ff",
    borderRadius: "12px",
    padding: "12px 24px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  return (
    <div style={pageStyle}>
      <article style={cardStyle}>
        <div style={badgeStyle}>
          OK!
        </div>
        <h1 style={titleStyle}>Your appointment has been booked!</h1>
        <p style={messageStyle}>
          Thanks for choosing Topflow Services. We'll reach out shortly to confirm the details and make sure everything is ready for your visit.
        </p>
        <div style={actionGroupStyle}>
          
        </div>
      </article>
    </div>
  );
}

export default AppointmentSuccess;
