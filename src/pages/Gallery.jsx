import { useEffect, useState } from "react";
const DOVE_GREY = "#2c2f34";
const EGGSHELL_BLUE = "#a7c7e7";

function splitNavPath(albumStack, currentAlbum) {
  const path = [...albumStack, currentAlbum].map((a) => a.name);
  return path;
}

function AlbumPreviewCard({ album, onClick }) {
  const previewPhoto =
    album.photos && album.photos.length > 0 ? album.photos[0].url : null;
  return (
    <div className="col-md-3 col-sm-4 col-6 mb-4">
      <div
        className="card bg-dark text-white shadow-sm border-0 h-100"
        style={{ cursor: "pointer" }}
        onClick={onClick}
      >
        {previewPhoto ? (
          <img
            src={previewPhoto}
            alt={album.name}
            className="card-img-top rounded-3"
            style={{
              objectFit: "cover",
              height: "180px",
              background: DOVE_GREY,
            }}
          />
        ) : (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "180px", background: DOVE_GREY }}
          >
            <span className="fw-bold" style={{ color: EGGSHELL_BLUE }}>
              {album.name}
            </span>
          </div>
        )}
        <div className="card-body text-center">
          <div className="fw-bold" style={{ color: EGGSHELL_BLUE }}>
            {album.name}
          </div>
        </div>
      </div>
    </div>
  );
}

function PhotoGrid({ photos, onPhotoClick }) {
  return (
    <div className="row mb-3">
      {photos.map((photo) => (
        <div className="col-md-3 col-sm-4 col-6 mb-3" key={photo.url}>
          <div
            className="card bg-dark text-white shadow-sm border-0"
            style={{ cursor: "pointer" }}
            onClick={() => onPhotoClick(photo)}
          >
            <img
              src={photo.url}
              alt="photo"
              className="card-img-top rounded-3"
              style={{
                objectFit: "cover",
                height: "200px",
                background: DOVE_GREY,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function AlbumView({
  album,
  albumStack,
  onSelectSubAlbum,
  onNavJump,
  onPhotoClick,
}) {
  // Navigation path clickable
  const navPathArr = splitNavPath(albumStack, album);
  return (
    <div className="mb-5">
      <div
        className="fw-bold mb-4"
        style={{ color: EGGSHELL_BLUE, fontSize: "1.7rem" }}
      >
        {navPathArr.map((name, idx) => (
          <span
            key={name}
            style={{
              cursor: idx < navPathArr.length - 1 ? "pointer" : "default",
              textDecoration:
                idx < navPathArr.length - 1 ? "underline" : "none",
            }}
            onClick={() => idx < navPathArr.length - 1 && onNavJump(idx)}
          >
            {name}
            {idx < navPathArr.length - 1 && (
              <span style={{ color: EGGSHELL_BLUE, margin: "0 8px" }}>|</span>
            )}
          </span>
        ))}
      </div>
      {album.albums && album.albums.length > 0 && (
        <div className="row mb-4">
          {album.albums.map((sub) => (
            <AlbumPreviewCard
              key={sub.name}
              album={sub}
              onClick={() => onSelectSubAlbum(sub)}
            />
          ))}
        </div>
      )}
      {album.photos && album.photos.length > 0 && (
        <>
          <h5 className="fw-bold mb-3" style={{ color: EGGSHELL_BLUE }}>
            Photos
          </h5>
          <PhotoGrid photos={album.photos} onPhotoClick={onPhotoClick} />
        </>
      )}
    </div>
  );
}

export default function Gallery() {
  const [gallery, setGallery] = useState(null);
  const [error, setError] = useState("");
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [albumStack, setAlbumStack] = useState([]);
  const [overlayPhoto, setOverlayPhoto] = useState(null);
  const [overlayIndex, setOverlayIndex] = useState(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setGallery(data);
        setCurrentAlbum(data);
        setAlbumStack([]);
      })
      .catch(() => setError("Could not load gallery."));
  }, []);

  function handleSelectSubAlbum(subAlbum) {
    setAlbumStack([...albumStack, currentAlbum]);
    setCurrentAlbum(subAlbum);
  }

  function handleNavJump(idx) {
    // Jump to a specific album in the stack
    if (idx < albumStack.length) {
      setCurrentAlbum(albumStack[idx]);
      setAlbumStack(albumStack.slice(0, idx));
    } else {
      setCurrentAlbum(currentAlbum);
    }
  }

  function handlePhotoClick(photo) {
    if (!currentAlbum || !currentAlbum.photos) return;
    const idx = currentAlbum.photos.findIndex(p => p.url === photo.url);
    setOverlayPhoto(photo);
    setOverlayIndex(idx);
  }

  function handleCloseOverlay() {
    setOverlayPhoto(null);
    setOverlayIndex(null);
  }

  function handlePrevPhoto() {
    if (overlayIndex > 0) {
      const prevPhoto = currentAlbum.photos[overlayIndex - 1];
      setOverlayPhoto(prevPhoto);
      setOverlayIndex(overlayIndex - 1);
    }
  }

  function handleNextPhoto() {
    if (overlayIndex < currentAlbum.photos.length - 1) {
      const nextPhoto = currentAlbum.photos[overlayIndex + 1];
      setOverlayPhoto(nextPhoto);
      setOverlayIndex(overlayIndex + 1);
    }
  }

  return (
    <div
      style={{ background: DOVE_GREY, minHeight: "80vh" }}
      className="py-5 px-3"
    >
      <div className="container">
        <h1 className="fw-bold mb-4" style={{ color: EGGSHELL_BLUE }}>
          Photo Gallery
        </h1>
        {error && <div className="alert alert-danger">{error}</div>}
        {!currentAlbum ? (
          <div className="text-white">Loading...</div>
        ) : (
          <>
            <AlbumView
              album={currentAlbum}
              albumStack={albumStack}
              onSelectSubAlbum={handleSelectSubAlbum}
              onNavJump={handleNavJump}
              onPhotoClick={handlePhotoClick}
            />
            {overlayPhoto && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  background: "rgba(44,47,52,0.97)",
                  zIndex: 9999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleCloseOverlay}
              >
                <div
                  style={{
                    position: "relative",
                    width: "95vw",
                    height: "95vh",
                    maxWidth: "1200px",
                    maxHeight: "95vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="btn btn-outline-light position-absolute"
                    style={{ top: '50%', left: 10, transform: 'translateY(-50%)', fontWeight: 'bold', fontSize: '2rem', zIndex: 2 }}
                    onClick={handlePrevPhoto}
                    disabled={overlayIndex === 0}
                  >
                    &#8592;
                  </button>
                  <img
                    src={overlayPhoto.url}
                    alt="photo"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      borderRadius: "1rem",
                      boxShadow: "0 0 32px #000",
                    }}
                  />
                  <button
                    className="btn btn-outline-light position-absolute"
                    style={{ top: '50%', right: 10, transform: 'translateY(-50%)', fontWeight: 'bold', fontSize: '2rem', zIndex: 2 }}
                    onClick={handleNextPhoto}
                    disabled={overlayIndex === currentAlbum.photos.length - 1}
                  >
                    &#8594;
                  </button>
                  <a
                    href={overlayPhoto.url}
                    download={overlayPhoto.name}
                    className="btn btn-light position-absolute"
                    style={{
                      top: 20,
                      right: 20,
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Download
                  </a>
                  <button
                    className="btn btn-outline-light position-absolute"
                    style={{
                      top: 20,
                      left: 20,
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                    onClick={handleCloseOverlay}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
