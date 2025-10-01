function SessionExpired() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Session Expired</h1>
      <p>
        Sorry, this booking link is no longer valid.
        <br />
        Please contact us to request a new link.
      </p>
    </div>
  );
}

export default SessionExpired;
