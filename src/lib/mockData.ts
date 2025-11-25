export interface Listing {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  lat: number;
  lng: number;
  price: number;
  imageUrl: string;
  hostId: string;
  hostName: string;
  hostAvatar: string;
  rating: number;
  reviews: number;
  amenities: string[];
  type: 'driveway' | 'garage' | 'covered' | 'street';
  dimensions: string;
  evCharger: boolean;
  available: boolean;
}

export interface Booking {
  id: string;
  listingId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Secure Downtown Garage Spot',
    description: 'Safe and secure parking spot in a gated garage downtown. Perfect for daily commuters.',
    address: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    lat: 37.7749,
    lng: -122.4194,
    price: 25,
    imageUrl: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&h=600&fit=crop',
    hostId: '2',
    hostName: 'Host User',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Host',
    rating: 4.9,
    reviews: 127,
    amenities: ['24/7 Access', 'Security Camera', 'Covered', 'EV Charger'],
    type: 'garage',
    dimensions: '9ft x 18ft',
    evCharger: true,
    available: true,
  },
  {
    id: '2',
    title: 'Covered Driveway Near Airport',
    description: 'Convenient covered parking spot just 5 minutes from the airport. Ideal for travelers.',
    address: '456 Airport Blvd',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94128',
    lat: 37.6213,
    lng: -122.3790,
    price: 18,
    imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&h=600&fit=crop',
    hostId: '2',
    hostName: 'Host User',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Host',
    rating: 4.7,
    reviews: 89,
    amenities: ['Covered', 'Airport Shuttle', 'Security'],
    type: 'covered',
    dimensions: '8ft x 16ft',
    evCharger: false,
    available: true,
  },
  {
    id: '3',
    title: 'Quiet Residential Driveway',
    description: 'Peaceful residential driveway in a safe neighborhood. Long-term parking welcome.',
    address: '789 Oak Avenue',
    city: 'Oakland',
    state: 'CA',
    zipCode: '94601',
    lat: 37.8044,
    lng: -122.2712,
    price: 12,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    hostId: '2',
    hostName: 'Host User',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Host',
    rating: 4.8,
    reviews: 54,
    amenities: ['Quiet Area', 'Long-term Available'],
    type: 'driveway',
    dimensions: '10ft x 20ft',
    evCharger: false,
    available: true,
  },
  {
    id: '4',
    title: 'Premium Garage with EV Charging',
    description: 'High-end secure garage with Level 2 EV charging station. Perfect for electric vehicles.',
    address: '321 Tech Drive',
    city: 'Palo Alto',
    state: 'CA',
    zipCode: '94301',
    lat: 37.4419,
    lng: -122.1430,
    price: 30,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    hostId: '2',
    hostName: 'Host User',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Host',
    rating: 5.0,
    reviews: 203,
    amenities: ['EV Charger', 'Indoor', 'Security', '24/7 Access', 'Covered'],
    type: 'garage',
    dimensions: '10ft x 20ft',
    evCharger: true,
    available: true,
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    listingId: '1',
    userId: '1',
    startDate: '2025-11-01',
    endDate: '2025-11-07',
    totalPrice: 175,
    status: 'confirmed',
    createdAt: '2025-10-25T10:00:00Z',
  },
  {
    id: 'b2',
    listingId: '3',
    userId: '1',
    startDate: '2025-11-15',
    endDate: '2025-11-20',
    totalPrice: 60,
    status: 'pending',
    createdAt: '2025-10-28T14:30:00Z',
  },
];
