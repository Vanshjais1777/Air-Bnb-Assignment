import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { SearchParams } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (params: SearchParams) => {
    const searchQuery = new URLSearchParams();
    if (params.location) searchQuery.set('location', params.location);
    if (params.checkIn) searchQuery.set('checkIn', params.checkIn.toISOString());
    if (params.checkOut) searchQuery.set('checkOut', params.checkOut.toISOString());
    if (params.guests) searchQuery.set('guests', params.guests.toString());
    
    navigate(`/search?${searchQuery.toString()}`);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero section */}
      <div 
        className="relative h-screen bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            Find your next adventure
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-center max-w-2xl">
            Discover unique homes, experiences, and places around the world.
          </p>
          
          <div className="w-full max-w-4xl">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>
      
      {/* Popular destinations */}
      <div className="container mx-auto px-4 md:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Popular destinations</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDestinations.map((destination, index) => (
            <div 
              key={index}
              className="relative rounded-xl overflow-hidden aspect-square cursor-pointer group"
              onClick={() => handleSearch({ location: destination.name })}
            >
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white text-xl font-bold">{destination.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Get inspired section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Get inspired for your next trip</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {inspirationCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-airbnb hover:shadow-airbnb-hover transition-shadow">
                <div className="aspect-video">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-airbnb-light-gray">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Call to action */}
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="bg-gray-100 rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to become a host?</h2>
            <p className="text-lg mb-6">
              Earn extra income and unlock new opportunities by sharing your space.
            </p>
            <button className="bg-airbnb-pink text-white px-6 py-3 rounded-lg font-semibold hover:bg-airbnb-red transition-colors">
              Learn more
            </button>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg" 
              alt="Become a host"
              className="rounded-lg w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const popularDestinations = [
  {
    name: 'New York',
    image: 'https://images.pexels.com/photos/802893/pexels-photo-802893.jpeg'
  },
  {
    name: 'Miami',
    image: 'https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg'
  },
  {
    name: 'Los Angeles',
    image: 'https://images.pexels.com/photos/1394967/pexels-photo-1394967.jpeg'
  },
  {
    name: 'San Francisco',
    image: 'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg'
  },
  {
    name: 'Chicago',
    image: 'https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg'
  },
  {
    name: 'Austin',
    image: 'https://images.pexels.com/photos/1209978/pexels-photo-1209978.jpeg'
  }
];

const inspirationCategories = [
  {
    name: 'Beach getaways',
    description: 'Relax and unwind with the sound of waves and warm sand.',
    image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg'
  },
  {
    name: 'Mountain retreats',
    description: 'Breathe fresh air and enjoy stunning views from your cabin.',
    image: 'https://images.pexels.com/photos/147411/pexels-photo-147411.jpeg'
  },
  {
    name: 'Urban adventures',
    description: 'Explore vibrant cities and immerse yourself in culture.',
    image: 'https://images.pexels.com/photos/2129796/pexels-photo-2129796.jpeg'
  },
  {
    name: 'Unique stays',
    description: 'Book one-of-a-kind places to stay and experience something new.',
    image: 'https://images.pexels.com/photos/2175952/pexels-photo-2175952.jpeg'
  }
];

export default Home;