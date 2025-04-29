import axios from 'axios';
import { Listing, SearchParams } from '../types';

// In a real application, this would be from environment variables
const API_BASE_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data to use until backend is connected
const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Luxurious apartment with ocean view',
    location: 'Miami Beach, Florida',
    address: '1234 Ocean Drive, Miami Beach, FL 33139',
    pricePerNight: 250,
    currency: 'USD',
    totalPrice: 1750,
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
      'https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg'
    ],
    rating: 4.92,
    numReviews: 124,
    description: 'Beautiful apartment with stunning ocean views. Perfect for a romantic getaway or a small family vacation. Close to restaurants, shops, and beach.',
    amenities: ['Wifi', 'Kitchen', 'Air conditioning', 'Pool', 'Free parking', 'Washer', 'Dryer'],
    host: {
      id: 'h1',
      name: 'Jessica',
      isSuperhost: true,
      profileImage: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg',
      responseRate: 98,
      responseTime: 'within an hour',
      joinDate: 'January 2018'
    },
    propertyType: 'Apartment',
    capacity: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2
  },
  {
    id: '2',
    title: 'Cozy cabin in the woods',
    location: 'Asheville, North Carolina',
    address: '789 Forest Road, Asheville, NC 28801',
    pricePerNight: 175,
    currency: 'USD',
    totalPrice: 1225,
    images: [
      'https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg',
      'https://images.pexels.com/photos/129494/pexels-photo-129494.jpeg',
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg'
    ],
    rating: 4.87,
    numReviews: 93,
    description: 'Escape to this peaceful cabin surrounded by nature. Enjoy hiking trails, wildlife, and gorgeous mountain views. Perfect for a relaxing retreat.',
    amenities: ['Wifi', 'Kitchen', 'Fireplace', 'Free parking', 'BBQ grill', 'Heating'],
    host: {
      id: 'h2',
      name: 'Michael',
      isSuperhost: true,
      profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      responseRate: 100,
      responseTime: 'within a few hours',
      joinDate: 'March 2019'
    },
    propertyType: 'Cabin',
    capacity: 6,
    bedrooms: 3,
    beds: 4,
    baths: 2
  },
  {
    id: '3',
    title: 'Modern downtown loft',
    location: 'Austin, Texas',
    address: '456 Main Street, Austin, TX 78701',
    pricePerNight: 195,
    currency: 'USD',
    totalPrice: 1365,
    images: [
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
      'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg',
      'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg'
    ],
    rating: 4.95,
    numReviews: 87,
    description: 'Stylish loft in the heart of downtown Austin. Walk to restaurants, bars, and music venues. Perfect for exploring the city.',
    amenities: ['Wifi', 'Kitchen', 'Air conditioning', 'Gym', 'Washer', 'Dryer', 'TV'],
    host: {
      id: 'h3',
      name: 'Sarah',
      isSuperhost: false,
      profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      responseRate: 95,
      responseTime: 'within a day',
      joinDate: 'June 2020'
    },
    propertyType: 'Loft',
    capacity: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1
  },
  {
    id: '4',
    title: 'Beachfront bungalow',
    location: 'Maui, Hawaii',
    address: '123 Beach Road, Lahaina, HI 96761',
    pricePerNight: 350,
    currency: 'USD',
    totalPrice: 2450,
    images: [
      'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg'
    ],
    rating: 4.99,
    numReviews: 156,
    description: 'Beautiful bungalow steps from the beach. Fall asleep to the sound of waves and wake up to stunning ocean views. Paradise awaits!',
    amenities: ['Wifi', 'Kitchen', 'Air conditioning', 'Beach access', 'Outdoor shower', 'BBQ grill'],
    host: {
      id: 'h4',
      name: 'David',
      isSuperhost: true,
      profileImage: 'https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg',
      responseRate: 99,
      responseTime: 'within an hour',
      joinDate: 'April 2017'
    },
    propertyType: 'Bungalow',
    capacity: 4,
    bedrooms: 2,
    beds: 2,
    baths: 1
  },
  {
    id: '5',
    title: 'Historic brownstone with garden',
    location: 'Brooklyn, New York',
    address: '567 Park Place, Brooklyn, NY 11238',
    pricePerNight: 275,
    currency: 'USD',
    totalPrice: 1925,
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'
    ],
    rating: 4.91,
    numReviews: 108,
    description: 'Charming brownstone in historic Brooklyn neighborhood. Features original details, modern amenities, and a lovely private garden.',
    amenities: ['Wifi', 'Kitchen', 'Heating', 'Garden', 'Washer', 'Dryer', 'TV'],
    host: {
      id: 'h5',
      name: 'Emily',
      isSuperhost: true,
      profileImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
      responseRate: 97,
      responseTime: 'within a few hours',
      joinDate: 'August 2018'
    },
    propertyType: 'Townhouse',
    capacity: 6,
    bedrooms: 3,
    beds: 3,
    baths: 2.5
  }
];

export const getListings = async (searchParams: SearchParams): Promise<Listing[]> => {
  // For demo purposes, return mock data until backend is connected
  // Filter mock data based on location if provided
  if (searchParams.location) {
    return mockListings.filter(listing => 
      listing.location.toLowerCase().includes(searchParams.location.toLowerCase())
    );
  }
  return mockListings;
};

export const getListing = async (id: string): Promise<Listing> => {
  // For demo purposes, return mock data until backend is connected
  const listing = mockListings.find(listing => listing.id === id);
  if (!listing) {
    throw new Error(`Listing with id ${id} not found`);
  }
  return listing;
};