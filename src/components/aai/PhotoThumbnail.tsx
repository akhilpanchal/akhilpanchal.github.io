import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

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

  return (
    <Dialog onOpenChange={() => setCurrentIndex(initialIndex)}>
      <DialogTrigger asChild>
        <Card className="w-32 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
          <img src={src} alt={alt} className="w-full h-32 object-cover" />
        </Card>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl bg-black/90 border-none p-0">
        {photos.length > 1 && currentIndex > 0 && (
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:opacity-80 transition-opacity bg-black/50 rounded-full p-2 z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {photos.length > 1 && currentIndex < photos.length - 1 && (
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:opacity-80 transition-opacity bg-black/50 rounded-full p-2 z-10"
            aria-label="Next photo"
          >
            <ChevronRight size={32} />
          </button>
        )}

        <div className="p-4">
          <img src={currentPhoto} alt={currentAlt} className="w-full h-auto rounded-lg" />
          {caption && <p className="text-white/80 text-center mt-4 text-sm">{caption}</p>}
          {photos.length > 1 && (
            <p className="text-white/60 text-center mt-2 text-xs">
              {currentIndex + 1} / {photos.length}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
