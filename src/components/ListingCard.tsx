import React from 'react';
import { Link } from 'react-router-dom';
import { Listing } from '../types';
import { Heart, Star } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  return (
    <Link 
      to={`/listing/${listing.id}`}
      className="block rounded-xl overflow-hidden transition-transform duration-200 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square">
        {/* Image */}
        <img 
          src={listing.images[currentImageIndex]} 
          alt={listing.title} 
          className="h-full w-full object-cover transition-opacity duration-300"
          loading="lazy"
        />
        
        {/* Image navigation controls (visible on hover) */}
        {isHovered && listing.images.length > 1 && (
          <>
            <button 
              onClick={(e) => { e.preventDefault(); prevImage(); }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md opacity-70 hover:opacity-100"
            >
              <span className="sr-only">Previous</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); nextImage(); }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md opacity-70 hover:opacity-100"
            >
              <span className="sr-only">Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* Favorite button */}
        <button 
          className="absolute top-3 right-3 text-white hover:text-airbnb-red z-10"
          onClick={(e) => { e.preventDefault(); /* Add to favorites logic */ }}
        >
          <Heart size={24} className="stroke-2 fill-transparent hover:fill-airbnb-red" />
        </button>
        
        {/* Image indicators */}
        {listing.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {listing.images.map((_, index) => (
              <span 
                key={index}
                className={`h-1.5 w-1.5 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Listing info */}
      <div className="mt-3">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-airbnb-dark-gray truncate">{listing.location}</h3>
          <div className="flex items-center">
            <Star size={14} className="fill-current text-airbnb-dark-gray" />
            <span className="ml-1 text-sm font-medium">{listing.rating}</span>
          </div>
        </div>
        <p className="text-airbnb-light-gray text-sm mt-1">{listing.propertyType}</p>
        <p className="text-airbnb-light-gray text-sm mt-1">
          {listing.bedrooms} bedroom{listing.bedrooms !== 1 ? 's' : ''} · {listing.beds} bed{listing.beds !== 1 ? 's' : ''}
        </p>
        <p className="mt-2">
          <span className="font-semibold">${listing.pricePerNight}</span>
          <span className="text-airbnb-dark-gray"> night</span>
        </p>
      </div>
    </Link>
  );
};

export default ListingCard;