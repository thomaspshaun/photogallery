import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, you would send the form data to a backend here
  }

  return (
    <div style={{ background: '#f8f9fa', minHeight: '80vh' }} className="d-flex justify-content-center align-items-center py-5">
      <div className="card shadow-lg p-5 rounded-4 w-100 mx-auto d-flex align-items-center justify-content-center" style={{ maxWidth: '900px', minHeight: '50vh', background: '#fff' }}>
        <div className="card-body text-center d-flex flex-column justify-content-center align-items-center w-100">
          <h1 className="card-title mb-4 fw-bold text-center display-3" style={{ color: '#0d6efd', letterSpacing: '2px' }}>
            Contact Us
          </h1>
          {submitted ? (
            <div className="alert alert-success text-center fs-4">Thank you! Your message has been sent.</div>
          ) : (
            <form className="w-100" style={{ maxWidth: 500 }} onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label fs-5">Name</label>
                <input
                  type="text"
                  className="form-control rounded-3 fs-5 py-2"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label fs-5">Email</label>
                <input
                  type="email"
                  className="form-control rounded-3 fs-5 py-2"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label fs-5">Message</label>
                <textarea
                  className="form-control rounded-3 fs-5 py-2"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 rounded-pill shadow-sm fs-5 py-2">
                Send
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
