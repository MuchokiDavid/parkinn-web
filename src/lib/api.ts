import { mockListings, mockBookings, Listing, Booking } from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Listings
  getListings: async (): Promise<Listing[]> => {
    await delay(500);
    return mockListings;
  },

  getListing: async (id: string): Promise<Listing | undefined> => {
    await delay(300);
    return mockListings.find(listing => listing.id === id);
  },

  searchListings: async (query?: string): Promise<Listing[]> => {
    await delay(500);
    if (!query) return mockListings;

    const lowerQuery = query.toLowerCase();
    return mockListings.filter(
      listing =>
        listing.title.toLowerCase().includes(lowerQuery) ||
        listing.city.toLowerCase().includes(lowerQuery) ||
        listing.address.toLowerCase().includes(lowerQuery)
    );
  },

  // Bookings
  getBookings: async (userId: string): Promise<Booking[]> => {
    await delay(400);
    return mockBookings.filter(booking => booking.userId === userId);
  },

  createBooking: async (booking: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> => {
    await delay(600);
    return {
      ...booking,
      id: `b${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
  },

  // Host endpoints
  getHostListings: async (hostId: string): Promise<Listing[]> => {
    await delay(400);
    return mockListings.filter(listing => listing.hostId === hostId);
  },

  getHostBookings: async (hostId: string): Promise<Booking[]> => {
    await delay(400);
    const hostListingIds = mockListings
      .filter(l => l.hostId === hostId)
      .map(l => l.id);
    return mockBookings.filter(b => hostListingIds.includes(b.listingId));
  },

  // Admin endpoints
  getAllUsers: async () => {
    await delay(500);
    return [
      { id: '1', email: 'guest@parkbnb.test', name: 'Guest User', role: 'guest', joinedAt: '2025-01-15' },
      { id: '2', email: 'host@parkbnb.test', name: 'Host User', role: 'host', joinedAt: '2024-11-20' },
      { id: '3', email: 'admin@parkbnb.test', name: 'Admin User', role: 'admin', joinedAt: '2024-10-01' },
    ];
  },

  getAllBookings: async (): Promise<Booking[]> => {
    await delay(500);
    return mockBookings;
  },
};

// Named exports for convenience
export const getListings = async (filters?: { query?: string }): Promise<Listing[]> => {
  await delay(500);
  if (filters?.query) {
    return api.searchListings(filters.query);
  }
  return mockListings;
};

export const getUserBookings = async (userId: string|number) => {
  await delay(400);
  return mockBookings.filter(booking => booking.userId === userId).map(booking => {
    const listing = mockListings.find(l => l.id === booking.listingId);
    return {
      id: booking.id,
      listingTitle: listing?.title || 'Unknown Listing',
      location: listing?.address || 'Unknown Location',
      startDate: booking.startDate,
      startTime: '9:00 AM', // Mock time
      endTime: '5:00 PM', // Mock time
      totalPrice: booking.totalPrice,
      status: booking.status,
    };
  });
};
