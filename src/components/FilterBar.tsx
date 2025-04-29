import React, { useState } from 'react';
import { Sliders } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface FilterBarProps {
  onFilterChange: (filters: string[]) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  const filterOptions: FilterOption[] = [
    { id: 'amazing_views', label: 'Amazing views' },
    { id: 'beachfront', label: 'Beachfront' },
    { id: 'cabins', label: 'Cabins' },
    { id: 'mansions', label: 'Mansions' },
    { id: 'tiny_homes', label: 'Tiny homes' },
    { id: 'countryside', label: 'Countryside' },
    { id: 'luxe', label: 'Luxe' },
    { id: 'pools', label: 'Amazing pools' },
    { id: 'design', label: 'Design' },
    { id: 'skiing', label: 'Skiing' },
    { id: 'historical', label: 'Historical homes' },
    { id: 'tropical', label: 'Tropical' }
  ];

  const handleFilterClick = (filterId: string) => {
    setSelectedFilters(prevFilters => {
      const newFilters = prevFilters.includes(filterId)
        ? prevFilters.filter(id => id !== filterId)
        : [...prevFilters, filterId];
      
      // Notify parent component of filter changes
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  return (
    <div className="w-full overflow-x-auto pt-20 pb-4 sticky top-0 bg-white z-10">
      <div className="flex items-center space-x-4 px-4 md:px-8">
        {filterOptions.map(filter => (
          <button
            key={filter.id}
            onClick={() => handleFilterClick(filter.id)}
            className={`flex items-center py-2 px-4 rounded-full whitespace-nowrap transition-colors ${
              selectedFilters.includes(filter.id)
                ? 'bg-black text-white'
                : 'bg-white text-gray-800 border border-gray-200 hover:border-gray-400'
            }`}
          >
            {filter.icon && <span className="mr-2">{filter.icon}</span>}
            <span className="text-sm font-medium">{filter.label}</span>
          </button>
        ))}
        
        <button className="flex items-center py-2 px-4 rounded-full border border-gray-300 whitespace-nowrap">
          <Sliders size={16} className="mr-2" />
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;