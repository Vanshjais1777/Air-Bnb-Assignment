import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Award, Share, Heart, ChevronDown, Check } from 'lucide-react';
import Header from '../components/Header';
import Gallery from '../components/Gallery';
import { getListing } from '../api/apiClient';
import { Listing } from '../types';

const ListingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAllDescription, setShowAllDescription] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const data = await getListing(id);
        setListing(data);
      } catch (error) {
        console.error(`Error fetching listing ${id}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 md:px-8 pt-24 pb-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-airbnb-red"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 md:px-8 pt-24 pb-12">
          <div className="text-center mt-12">
            <h2 className="text-xl font-semibold text-airbnb-dark-gray mb-2">
              Listing not found
            </h2>
            <p className="text-airbnb-light-gray">
              The listing you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 md:px-8 pt-24 pb-12">
        {/* Title section */}
        <h1 className="text-2xl md:text-3xl font-semibold text-airbnb-dark-gray mb-2">{listing.title}</h1>
        
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div className="flex items-center flex-wrap">
            <div className="flex items-center mr-4">
              <Star size={16} className="fill-current text-airbnb-dark-gray" />
              <span className="ml-1 font-medium">{listing.rating}</span>
              <span className="mx-1">·</span>
              <span className="underline">{listing.numReviews} reviews</span>
            </div>
            
            {listing.host.isSuperhost && (
              <div className="flex items-center mr-4">
                <Award size={16} className="mr-1 text-airbnb-red" />
                <span className="font-medium">Superhost</span>
              </div>
            )}
            
            <span className="underline font-medium">{listing.location}</span>
          </div>
          
          <div className="flex mt-2 md:mt-0">
            <button className="flex items-center mr-4 hover:underline">
              <Share size={16} className="mr-1" />
              <span>Share</span>
            </button>
            <button className="flex items-center hover:underline">
              <Heart size={16} className="mr-1" />
              <span>Save</span>
            </button>
          </div>
        </div>
        
        {/* Photo gallery */}
        <Gallery images={listing.images} title={listing.title} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            {/* Listing info */}
            <div className="border-b border-airbnb-border pb-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold mb-2">
                    {listing.propertyType} hosted by {listing.host.name}
                  </h2>
                  <p>
                    {listing.capacity} guest{listing.capacity !== 1 ? 's' : ''} · 
                    {' '}{listing.bedrooms} bedroom{listing.bedrooms !== 1 ? 's' : ''} · 
                    {' '}{listing.beds} bed{listing.beds !== 1 ? 's' : ''} · 
                    {' '}{listing.baths} bath{listing.baths !== 1 ? 's' : ''}
                  </p>
                </div>
                <img 
                  src={listing.host.profileImage}
                  alt={listing.host.name}
                  className="w-14 h-14 rounded-full"
                />
              </div>
            </div>
            
            {/* Host info */}
            {listing.host.isSuperhost && (
              <div className="border-b border-airbnb-border pb-6 mb-6">
                <div className="flex items-center">
                  <Award size={24} className="text-airbnb-red mr-4" />
                  <div>
                    <h3 className="font-semibold">{listing.host.name} is a Superhost</h3>
                    <p className="text-airbnb-light-gray text-sm">
                      Superhosts are experienced, highly rated hosts committed to providing great stays.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Description */}
            <div className="border-b border-airbnb-border pb-6 mb-6">
              <div className={`${showAllDescription ? '' : 'line-clamp-3'}`}>
                <p className="whitespace-pre-line">{listing.description}</p>
              </div>
              {listing.description.length > 250 && (
                <button 
                  onClick={() => setShowAllDescription(!showAllDescription)}
                  className="mt-2 font-semibold underline"
                >
                  {showAllDescription ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
            
            {/* Amenities */}
            <div className="border-b border-airbnb-border pb-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${showAllAmenities ? '' : 'max-h-64 overflow-hidden'}`}>
                {listing.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <Check size={20} className="mr-4" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
              
              {listing.amenities.length > 6 && (
                <button 
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                  className="mt-4 px-6 py-3 border border-airbnb-dark-gray rounded-lg font-semibold"
                >
                  Show all {listing.amenities.length} amenities
                </button>
              )}
            </div>
          </div>
          
          {/* Booking card */}
          <div className="md:col-span-1">
            <div className="sticky top-28 border border-airbnb-border rounded-xl shadow-airbnb p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xl font-semibold">${listing.pricePerNight}</span>
                  <span> night</span>
                </div>
                <div className="flex items-center">
                  <Star size={14} className="fill-current text-airbnb-dark-gray" />
                  <span className="ml-1 font-medium">{listing.rating}</span>
                  <span className="mx-1 text-airbnb-light-gray">·</span>
                  <span className="text-airbnb-light-gray underline">{listing.numReviews} reviews</span>
                </div>
              </div>
              
              <div className="border border-gray-300 rounded-lg mb-4">
                <div className="grid grid-cols-2">
                  <div className="p-3 border-r border-b border-gray-300">
                    <div className="text-xs font-bold">CHECK-IN</div>
                    <div>Add date</div>
                  </div>
                  <div className="p-3 border-b border-gray-300">
                    <div className="text-xs font-bold">CHECKOUT</div>
                    <div>Add date</div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-xs font-bold">GUESTS</div>
                  <div className="flex justify-between items-center">
                    <div>1 guest</div>
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-airbnb-pink text-white py-3 rounded-lg font-semibold hover:bg-airbnb-red transition-colors mb-4">
                Reserve
              </button>
              
              <div className="text-center text-sm">You won't be charged yet</div>
              
              <div className="mt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="underline">${listing.pricePerNight} x 5 nights</div>
                  <div>${listing.pricePerNight * 5}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="underline">Cleaning fee</div>
                  <div>$85</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="underline">Airbnb service fee</div>
                  <div>${Math.round(listing.pricePerNight * 5 * 0.14)}</div>
                </div>
                <div className="pt-4 border-t border-gray-300 flex justify-between items-center font-semibold">
                  <div>Total before taxes</div>
                  <div>${listing.pricePerNight * 5 + 85 + Math.round(listing.pricePerNight * 5 * 0.14)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;