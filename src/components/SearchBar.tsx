import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Search, Calendar, Users } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';
import { SearchParams } from '../types';

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('location');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      location,
      checkIn: checkIn || undefined,
      checkOut: checkOut || undefined,
      guests: guests || undefined
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-full shadow-airbnb">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col md:flex-row">
          <div 
            className={`flex-1 p-3 md:p-4 rounded-full cursor-pointer ${activeTab === 'location' ? 'bg-gray-100' : ''}`}
            onClick={() => setActiveTab('location')}
          >
            <div className="text-xs font-bold mb-1">Where</div>
            <input
              type="text"
              placeholder="Search destinations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
          
          <div 
            className={`flex-1 p-3 md:p-4 rounded-full cursor-pointer ${activeTab === 'checkin' ? 'bg-gray-100' : ''}`}
            onClick={() => setActiveTab('checkin')}
          >
            <div className="text-xs font-bold mb-1">Check in</div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-gray-500" />
              <DatePicker
                selected={checkIn}
                onChange={(date) => setCheckIn(date)}
                placeholderText="Add dates"
                className="w-full bg-transparent outline-none text-sm"
                wrapperClassName="w-full"
              />
            </div>
          </div>
          
          <div 
            className={`flex-1 p-3 md:p-4 rounded-full cursor-pointer ${activeTab === 'checkout' ? 'bg-gray-100' : ''}`}
            onClick={() => setActiveTab('checkout')}
          >
            <div className="text-xs font-bold mb-1">Check out</div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-gray-500" />
              <DatePicker
                selected={checkOut}
                onChange={(date) => setCheckOut(date)}
                placeholderText="Add dates"
                className="w-full bg-transparent outline-none text-sm"
                wrapperClassName="w-full"
              />
            </div>
          </div>
          
          <div 
            className={`flex-1 p-3 md:p-4 rounded-full cursor-pointer ${activeTab === 'guests' ? 'bg-gray-100' : ''}`}
            onClick={() => setActiveTab('guests')}
          >
            <div className="text-xs font-bold mb-1">Who</div>
            <div className="flex items-center">
              <Users size={16} className="mr-2 text-gray-500" />
              <input
                type="number"
                min="1"
                max="16"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="w-full bg-transparent outline-none text-sm"
                placeholder="Add guests"
              />
            </div>
          </div>
          
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-airbnb-pink text-white p-4 rounded-full hover:bg-airbnb-red transition-colors">
            <Search size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;