export default function Home() {
  return (
    <div
      style={{ background: "#0d6efd", minHeight: "80vh" }}
      className="d-flex flex-column justify-content-center align-items-center py-5 text-center"
    >
      <h1
        className="fw-bold display-3 mb-4 text-white"
        style={{ letterSpacing: "2px" }}
      >
        Welcome to thomaspshaun
      </h1>
      <p className="lead mb-5 fs-4 text-white-50">
        A modern React demo by thomaspshaun.
        <br />
        Experience a clean, responsive, and visually appealing design.
      </p>
      <a
        href="/contact"
        className="btn btn-light btn-lg rounded-pill shadow-sm px-5 py-2 fs-5"
      >
        Contact Us
      </a>
    </div>
  );
}
