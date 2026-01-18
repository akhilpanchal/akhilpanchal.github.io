import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoThumbnailProps {
  src: string;
  alt: string;
  caption?: string;
  allPhotos?: string[];
  allPhotoAlts?: string[];
  initialIndex?: number;
}

export default function PhotoThumbnail({ 
  src, 
  alt, 
  caption, 
  allPhotos,
  allPhotoAlts,
  initialIndex = 0
}: PhotoThumbnailProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const photos = allPhotos || [src];
  const photoAlts = allPhotoAlts || [alt];
  const currentPhoto = photos[currentIndex];
  const currentAlt = photoAlts[currentIndex] || alt;

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => Math.min(photos.length - 1, prev + 1));
  };

  const handleOpen = () => {
    setCurrentIndex(initialIndex);
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="relative block w-32 h-32 rounded-md overflow-hidden border border-border hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white hover:opacity-80 transition-opacity"
            aria-label="Close"
          >
            <X size={32} />
          </button>

          {/* Previous button */}
          {photos.length > 1 && currentIndex > 0 && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:opacity-80 transition-opacity bg-black/50 rounded-full p-2"
              aria-label="Previous photo"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {/* Next button */}
          {photos.length > 1 && currentIndex < photos.length - 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:opacity-80 transition-opacity bg-black/50 rounded-full p-2"
              aria-label="Next photo"
            >
              <ChevronRight size={32} />
            </button>
          )}

          <div className="max-w-4xl w-full">
            <img
              src={currentPhoto}
              alt={currentAlt}
              className="w-full h-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            {caption && (
              <p className="text-white/80 text-center mt-4 text-sm">{caption}</p>
            )}
            {photos.length > 1 && (
              <p className="text-white/60 text-center mt-2 text-xs">
                {currentIndex + 1} / {photos.length}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
