# ParkBnB - Peer-to-Peer Parking Marketplace MVP

A beautiful, fully-featured frontend MVP for a peer-to-peer parking marketplace built with React, TypeScript, TailwindCSS, and modern web technologies.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

## 🎭 Demo Accounts

ParkBnB includes three different user roles with mock authentication:

### Guest User
- **Email:** `guest@parkbnb.test`
- **Password:** `guest123`
- **Access:** Search listings, view details, manage bookings

### Host User
- **Email:** `host@parkbnb.test`
- **Password:** `host123`
- **Access:** Host dashboard with listings management, bookings overview, earnings

### Admin User
- **Email:** `admin@parkbnb.test`
- **Password:** `admin123`
- **Access:** Full platform overview, user management, analytics

## 📱 Features

### Public Pages
- **Landing Page**: Beautiful hero section, features, how it works, reviews, and CTAs
- **Search & Browse**: Filter and search parking spots with TanStack Query
- **Listing Details**: Full spot details with amenities, host info, and booking widget
- **About**: Company information and values

### User Dashboards

#### Guest Dashboard
- View active and pending bookings
- See total spending
- Manage saved spots
- Booking history with status tracking

#### Host Dashboard
- Earnings overview and statistics
- Listings management with TanStack Table
- Active bookings tracking
- Average rating display
- Quick "Add Listing" action

#### Admin Dashboard
- Platform-wide statistics
- User management table
- Listings overview by type
- Revenue tracking
- EV charging spots analytics

### Core Features
- **Dark/Light Mode**: Persistent theme toggle with system preference fallback
- **Mock Authentication**: Zustand-powered auth state with localStorage persistence
- **Mock API Layer**: TanStack Query for all data fetching with realistic delays
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Loading States**: Skeleton loaders and error handling
- **Toast Notifications**: User feedback with Sonner

## 🛠️ Tech Stack

- **Framework**: Vite + React 18 + TypeScript
- **Styling**: TailwindCSS with custom design system
- **UI Components**: Shadcn/ui
- **State Management**: Zustand (auth & theme)
- **Data Fetching**: TanStack Query v5
- **Tables**: TanStack Table v8
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📂 Project Structure

```
src/
├── assets/           # Images and static assets
├── components/       # Reusable components
│   ├── ui/          # Shadcn UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ListingCard.tsx
│   ├── ThemeToggle.tsx
│   └── ProtectedRoute.tsx
├── lib/             # Utilities and mock data
│   ├── api.ts       # Mock API functions
│   ├── mockData.ts  # Mock database
│   └── utils.ts
├── pages/           # Route pages
│   ├── Landing.tsx
│   ├── Search.tsx
│   ├── ListingDetail.tsx
│   ├── Auth.tsx
│   ├── About.tsx
│   ├── GuestDashboard.tsx
│   ├── HostDashboard.tsx
│   └── AdminDashboard.tsx
├── stores/          # Zustand stores
│   ├── authStore.ts
│   └── themeStore.ts
├── App.tsx
├── main.tsx
└── index.css        # Design system tokens
```

## 🎨 Design System

The app uses a comprehensive design system defined in `src/index.css`:

- **Primary**: Trust-inspiring teal/blue (parking sign colors)
- **Secondary**: Warm amber for CTAs
- **Semantic tokens**: All colors use HSL and CSS variables
- **Dark mode**: Full dark theme support
- **Gradients**: Hero and subtle background gradients
- **Shadows**: Elegant shadows with primary color tints
- **Responsive**: Mobile-first with breakpoints

## 🔐 Authentication Flow

1. Visit `/auth` to sign in
2. Click a demo account button to auto-fill credentials
3. Submit form to authenticate
4. Automatically redirected to role-specific dashboard
5. Auth state persisted in localStorage
6. Protected routes check authentication and role

## 🗺️ Routes

- `/` - Landing page
- `/search` - Browse all parking spots
- `/search?q=query` - Search with query
- `/listing/:id` - Listing detail page
- `/auth` - Sign in page
- `/about` - About page
- `/guest` - Guest dashboard (protected)
- `/host` - Host dashboard (protected)
- `/admin` - Admin dashboard (protected)

## 📊 Mock Data

The app includes realistic mock data for:
- 4 parking listings (various types and locations)
- 2 sample bookings
- 3 users (guest, host, admin)
- Simulated API delays (300-600ms)
- TanStack Query caching

## 🎯 What's Next?

This MVP demonstrates the complete UI/UX but uses mock data. To make it production-ready:

1. **Backend Integration**: Replace mock API with real endpoints
2. **Real Authentication**: Integrate with auth provider (e.g., Supabase, Auth0)
3. **Payment Processing**: Add Stripe or similar for transactions
4. **Map Integration**: Add Mapbox/Google Maps for location search
5. **Image Upload**: Allow hosts to upload listing photos
6. **Real-time Updates**: WebSocket for booking notifications
7. **Reviews System**: User reviews and ratings
8. **Calendar Integration**: Availability calendar for hosts
9. **Email Notifications**: Booking confirmations and reminders
10. **Analytics**: Track user behavior and optimize

## 📄 License

MIT License - feel free to use this for your own projects!

## 🙏 Credits

Built with ❤️ using Vite, React, TypeScript, and modern web technologies.
