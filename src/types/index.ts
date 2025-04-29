export interface Host {
  id: string;
  name: string;
  isSuperhost: boolean;
  profileImage: string;
  responseRate?: number;
  responseTime?: string;
  joinDate?: string;
}

export interface Listing {
  id: string;
  title: string;
  location: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  pricePerNight: number;
  currency: string;
  totalPrice?: number;
  images: string[];
  rating: number;
  numReviews: number;
  description: string;
  amenities: string[];
  host: Host;
  propertyType: string;
  capacity: number;
  bedrooms: number;
  beds: number;
  baths: number;
  checkIn?: string;
  checkOut?: string;
}

export interface SearchParams {
  location: string;
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}