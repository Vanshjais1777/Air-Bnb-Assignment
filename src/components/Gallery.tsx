import React, { useState } from 'react';
import { X } from 'lucide-react';

interface GalleryProps {
  images: string[];
  title: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, title }) => {
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setShowFullGallery(true);
    // Prevent body scrolling when gallery is open
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setShowFullGallery(false);
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showFullGallery) return;
      
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFullGallery]);

  return (
    <div className="relative mb-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">{title}</h2>
      
      {/* Grid gallery */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden">
        {images.length > 0 && (
          <div className="md:col-span-2 md:row-span-2 aspect-square md:aspect-auto">
            <img 
              src={images[0]} 
              alt={`${title} - main`}
              className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openGallery(0)}
            />
          </div>
        )}
        
        {images.slice(1, 5).map((image, index) => (
          <div key={index} className="aspect-square">
            <img 
              src={image} 
              alt={`${title} - ${index + 1}`}
              className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openGallery(index + 1)}
            />
          </div>
        ))}
      </div>
      
      {/* View all photos button */}
      {images.length > 5 && (
        <button 
          onClick={() => openGallery(0)}
          className="absolute bottom-4 right-4 bg-white py-2 px-4 rounded-lg shadow-md text-sm font-medium flex items-center"
        >
          Show all photos
        </button>
      )}
      
      {/* Full screen gallery */}
      {showFullGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
          {/* Header with close button */}
          <div className="flex justify-between items-center p-4 text-white">
            <span className="text-sm">
              {currentImageIndex + 1} / {images.length}
            </span>
            <button 
              onClick={closeGallery}
              className="rounded-full p-2 hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Gallery content */}
          <div className="flex-1 flex items-center justify-center px-4 relative">
            <img 
              src={images[currentImageIndex]} 
              alt={`${title} - ${currentImageIndex}`}
              className="max-h-full max-w-full object-contain"
            />
            
            {/* Navigation buttons */}
            <button 
              onClick={prevImage}
              className="absolute left-4 bg-white/10 hover:bg-white/30 rounded-full p-3 transition-colors"
            >
              <span className="sr-only">Previous</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 bg-white/10 hover:bg-white/30 rounded-full p-3 transition-colors"
            >
              <span className="sr-only">Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;