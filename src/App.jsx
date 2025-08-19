import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Gallery from './pages/Gallery.jsx';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg" style={{ background: '#0d6efd' }}>
        <div className="container">
          <Link className="navbar-brand fw-bold text-white fs-2" to="/" style={{ letterSpacing: '2px' }}>
            thomaspshaun
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-white fs-5 mx-2" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fs-5 mx-2" to="/gallery">Gallery</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fs-5 mx-2" to="/about">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fs-5 mx-2" to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
