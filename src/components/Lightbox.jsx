import React, { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Lightbox({ images, index, alt, onClose, onNavigate }) {
  const goPrev = useCallback(
    () => onNavigate((index - 1 + images.length) % images.length),
    [index, images.length, onNavigate],
  );
  const goNext = useCallback(() => onNavigate((index + 1) % images.length), [index, images.length, onNavigate]);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, goPrev, goNext]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <button className="lightbox-close" type="button" onClick={onClose} aria-label="Затвори">
        <X size={26} />
      </button>

      {images.length > 1 && (
        <button
          className="lightbox-nav prev"
          type="button"
          aria-label="Предишна снимка"
          onClick={(event) => {
            event.stopPropagation();
            goPrev();
          }}
        >
          <ChevronLeft size={30} />
        </button>
      )}

      <img src={images[index]} alt={alt} onClick={(event) => event.stopPropagation()} />

      {images.length > 1 && (
        <button
          className="lightbox-nav next"
          type="button"
          aria-label="Следваща снимка"
          onClick={(event) => {
            event.stopPropagation();
            goNext();
          }}
        >
          <ChevronRight size={30} />
        </button>
      )}

      {images.length > 1 && (
        <div className="lightbox-counter">
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
