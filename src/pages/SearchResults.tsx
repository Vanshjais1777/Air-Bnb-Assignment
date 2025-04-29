import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ListingCard from '../components/ListingCard';
import { getListings } from '../api/apiClient';
import { Listing, SearchParams } from '../types';
import { MapPin } from 'lucide-react';

const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<string[]>([]);

  // Extract search params from URL
  const searchParams = new URLSearchParams(location.search);
  const locationParam = searchParams.get('location') || '';
  const checkInParam = searchParams.get('checkIn') ? new Date(searchParams.get('checkIn')!) : undefined;
  const checkOutParam = searchParams.get('checkOut') ? new Date(searchParams.get('checkOut')!) : undefined;
  const guestsParam = searchParams.get('guests') ? parseInt(searchParams.get('guests')!) : undefined;

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const params: SearchParams = {
          location: locationParam,
          checkIn: checkInParam,
          checkOut: checkOutParam,
          guests: guestsParam
        };
        
        const data = await getListings(params);
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [locationParam, checkInParam, checkOutParam, guestsParam]);

  const handleSearch = (params: SearchParams) => {
    const searchQuery = new URLSearchParams();
    if (params.location) searchQuery.set('location', params.location);
    if (params.checkIn) searchQuery.set('checkIn', params.checkIn.toISOString());
    if (params.checkOut) searchQuery.set('checkOut', params.checkOut.toISOString());
    if (params.guests) searchQuery.set('guests', params.guests.toString());
    
    navigate(`/search?${searchQuery.toString()}`);
  };

  const handleFilterChange = (selectedFilters: string[]) => {
    setFilters(selectedFilters);
    // In a real app, you would filter the listings or make a new API call with these filters
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 md:px-8 pt-24 pb-12">
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <FilterBar onFilterChange={handleFilterChange} />
        
        {loading ? (
          <div className="flex justify-center items-center mt-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-airbnb-red"></div>
          </div>
        ) : (
          <>
            {listings.length > 0 ? (
              <>
                <div className="mt-4 mb-8 flex items-center">
                  <MapPin size={18} className="text-airbnb-dark-gray mr-2" />
                  <h1 className="text-lg md:text-xl font-semibold">
                    {locationParam ? `Stays in ${locationParam}` : 'All stays'}
                  </h1>
                  <p className="ml-auto text-sm text-airbnb-dark-gray">
                    {listings.length} {listings.length === 1 ? 'stay' : 'stays'}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {listings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center mt-12 py-12">
                <h2 className="text-xl font-semibold text-airbnb-dark-gray mb-2">
                  No results found
                </h2>
                <p className="text-airbnb-light-gray max-w-md mx-auto">
                  Try adjusting your search by changing the location, dates, or number of guests.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;