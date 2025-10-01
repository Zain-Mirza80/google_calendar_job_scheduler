import { useState } from "react";
import api from "../api";

function SessionLinkGenerator() {
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateLink = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/api/session/create/");
      const newLink = `${window.location.origin}/book/${res.data.token}`;
      setLink(newLink);
    } catch (err) {
      console.error("Failed to generate session link", err);
      setError("Failed to generate link. Please try again.");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (link) {
      navigator.clipboard.writeText(link);
      alert("Booking link copied to clipboard!");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px", color: "#1d1d1f" }}>
        Generate Booking Link
      </h1>
      <p style={{ marginBottom: "30px", color: "#5f6368" }}>
        Click the button below to generate a unique booking link for your
        customer. The link will expire after 48 hours or once it’s used.
      </p>

      <button
        onClick={generateLink}
        disabled={loading}
        style={{
          backgroundColor: "#3b4cca",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "12px 24px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 6px 14px rgba(59, 76, 202, 0.25)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        {loading ? "Generating..." : "Generate New Link"}
      </button>

      {error && (
        <p style={{ marginTop: "20px", color: "red" }}>{error}</p>
      )}

      {link && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border: "1px solid #c6d2fb",
            borderRadius: "12px",
            backgroundColor: "#f8fbff",
          }}
        >
          <p style={{ marginBottom: "12px", fontSize: "15px", color: "#1d1d1f" }}>
            <strong>Booking Link:</strong>
          </p>
          <input
            type="text"
            value={link}
            readOnly
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #c6d2fb",
              borderRadius: "8px",
              marginBottom: "12px",
              backgroundColor: "#fff",
              color: "#333",
            }}
          />
          <button
            onClick={copyToClipboard}
            style={{
              backgroundColor: "#e8f5e9",
              color: "#1b5e20",
              border: "none",
              borderRadius: "8px",
              padding: "10px 18px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}

export default SessionLinkGenerator;
