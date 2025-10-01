function formatDateTime(datetime) {
  if (!datetime) {
    return "Not set";
  }

  const date = new Date(datetime);
  if (Number.isNaN(date.getTime())) {
    return datetime;
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function AppointmentCard(props) {
  const appointment = props.data ?? props;
  const {
    name = "Unnamed",
    email = "No email provided",
    mobile = "No phone provided",
    address = "No address provided",
    datetime,
    description = "No description provided",
    image,
  } = appointment;

  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #b0c5f0",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    maxWidth: "420px",
    display: "flex",
    flexDirection: "column",
  };

  const headerStyle = {
    display: "flex",
    gap: "16px",
    padding: "20px",
    borderBottom: "1px solid #f1f1f1",
    background: "linear-gradient(135deg, #f8fbff 0%, #eef2ff 100%)",
  };

  const avatarWrapper = {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    overflow: "hidden",
    backgroundColor: "#d9e2ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "600",
    color: "#3b4cca",
    flexShrink: 0,
  };

  const bodyStyle = {
    display: "grid",
    gap: "12px",
    padding: "20px",
    backgroundColor: "#fbfdff",
  };

  const detailRow = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  };

  const actionsRowStyle = {
    display: "flex",
    gap: "12px",
    padding: "16px 20px",
    borderTop: "1px solid #f1f1f1",
    backgroundColor: "#ffffff",
  };

  const buttonBase = {
    flex: 1,
    padding: "10px 14px",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };

  const avatarAlt = `${name || "Guest"} avatar`;

  return (
    <article style={cardStyle}>
      <header style={headerStyle}>
        <div style={avatarWrapper}>
          {image ? (
            <img
              src={image}
              alt={avatarAlt}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            (name || "").slice(0, 2).toUpperCase() || "?"
          )}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontSize: "20px", color: "#1d1d1f" }}>{name}</h3>
          <p style={{ margin: "6px 0", fontSize: "14px", color: "#5f6368" }}>{mobile}</p>
        </div>
      </header>

      <div style={actionsRowStyle}>
        <button
          type="button"
          style={{
            ...buttonBase,
            backgroundColor: "#e8f5e9",
            color: "#1b5e20",
          }}
        >
          ✓ Approve
        </button>
        <button
          type="button"
          style={{
            ...buttonBase,
            backgroundColor: "#fff8e1",
            color: "#f57f17",
          }}
        >
          ✎ Edit
        </button>
        <button
          type="button"
          style={{
            ...buttonBase,
            backgroundColor: "#fdecea",
            color: "#b71c1c",
          }}
        >
          ✕ Reject
        </button>
      </div>

      <section style={bodyStyle}>
        <div style={detailRow}>
          <span style={{ fontSize: "12px", color: "#8892a6", letterSpacing: "0.4px" }}>EMAIL</span>
          <span style={{ fontSize: "15px", color: "#1f2933" }}>{email}</span>
        </div>
        <div style={detailRow}>
          <span style={{ fontSize: "12px", color: "#8892a6", letterSpacing: "0.4px" }}>ADDRESS</span>
          <span style={{ fontSize: "15px", color: "#1f2933" }}>{address}</span>
        </div>
        <div style={detailRow}>
          <span style={{ fontSize: "12px", color: "#8892a6", letterSpacing: "0.4px" }}>DATE & TIME</span>
          <span style={{ fontSize: "15px", color: "#1f2933" }}>{formatDateTime(datetime)}</span>
        </div>
        <div style={detailRow}>
          <span style={{ fontSize: "12px", color: "#8892a6", letterSpacing: "0.4px" }}>NOTES</span>
          <span style={{ fontSize: "15px", color: "#1f2933", whiteSpace: "pre-line" }}>{description}</span>
        </div>
      </section>

    </article>
  );
}

export default AppointmentCard;
