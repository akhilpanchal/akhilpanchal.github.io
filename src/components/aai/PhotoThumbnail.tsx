import { useState } from 'react';
import { X } from 'lucide-react';

interface PhotoThumbnailProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function PhotoThumbnail({ src, alt, caption }: PhotoThumbnailProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
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
          <div className="max-w-4xl w-full">
            <img
              src={src}
              alt={alt}
              className="w-full h-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            {caption && (
              <p className="text-white/80 text-center mt-4 text-sm">{caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
