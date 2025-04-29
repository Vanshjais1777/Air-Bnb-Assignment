import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Menu, Globe } from 'lucide-react';
import logo from '../assets/airbnb-logo.svg';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Airbnb" 
              className="h-8 md:h-10" 
              onError={(e) => {
                // Fallback if SVG fails to load
                const target = e.target as HTMLImageElement;
                target.src = "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg";
              }}
            />
          </Link>

          {/* Search Bar */}
          <div className={`hidden md:flex items-center rounded-full border border-airbnb-border p-2 shadow-sm hover:shadow transition-all ${
            isScrolled ? 'bg-white' : 'bg-white'
          }`}>
            <button className="px-4 font-medium text-airbnb-dark-gray">Anywhere</button>
            <span className="h-5 w-px bg-gray-300"></span>
            <button className="px-4 font-medium text-airbnb-dark-gray">Any week</button>
            <span className="h-5 w-px bg-gray-300"></span>
            <button className="px-4 font-medium text-airbnb-light-gray">Add guests</button>
            <button className="bg-airbnb-red p-2 rounded-full text-white">
              <Search size={16} />
            </button>
          </div>

          {/* User Menu */}
          <div className="flex items-center">
            <button className="hidden md:block px-4 py-2 rounded-full hover:bg-gray-100 text-airbnb-dark-gray font-medium transition-colors">
              Airbnb your home
            </button>
            <button className="p-3 rounded-full hover:bg-gray-100 transition-colors">
              <Globe size={18} className="text-gray-700" />
            </button>
            <div className="flex items-center ml-2 border border-airbnb-border rounded-full p-1 hover:shadow-md transition-all">
              <Menu size={18} className="text-gray-700 mx-2" />
              <div className="rounded-full bg-gray-500 text-white p-1">
                <User size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;