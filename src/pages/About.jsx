export default function About() {
  return (
    <div
      style={{ background: "#f8f9fa", minHeight: "80vh" }}
      className="d-flex flex-column justify-content-center align-items-center py-5 text-center"
    >
      <h1
        className="fw-bold display-3 mb-4"
        style={{ color: "#0d6efd", letterSpacing: "2px" }}
      >
        About Us
      </h1>
      <p className="lead mb-5 fs-4 text-secondary">
        Academia is a demo React application showcasing modern web development
        best practices.
        <br />
        Built with Vite, React, and Bootstrap for speed and style.
      </p>
    </div>
  );
}
