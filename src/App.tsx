import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";
import Landing from "./pages/Landing";
import Search from "./pages/Search";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Activate from "./pages/auth/Activate";
import NotLoggedIn from "./pages/auth/NotLoggedIn";
import Unauthorised from "./pages/auth/Unauthorised";
import About from "./pages/About";
import ListingDetail from "./pages/ListingDetail";
import NotFound from "./pages/NotFound";

// Guest pages
import MyBookings from "./pages/dashboard/guest/MyBookings";
import SavedSpots from "./pages/dashboard/guest/SavedSpots";
import Profile from "./pages/dashboard/guest/Profile";

// Host pages
import HostOverview from "./pages/dashboard/host/HostOverview";
import MyListings from "./pages/dashboard/host/MyListings";
import HostCalendar from "./pages/dashboard/host/HostCalendar";
import HostBookings from "./pages/dashboard/host/HostBookings";
import Earnings from "./pages/dashboard/host/Earnings";

// Admin pages
import AdminOverview from "./pages/dashboard/admin/AdminOverview";
import AdminUsers from "./pages/dashboard/admin/AdminUsers";
import AdminListings from "./pages/dashboard/admin/AdminListings";
import AdminReports from "./pages/dashboard/admin/AdminReports";

// Motorist pages
import MotoristOverview from "./pages/dashboard/motorist/MotoristOverview";
import MotoristBookings from "./pages/dashboard/motorist/MotoristBookings";
import MotoristSaved from "./pages/dashboard/motorist/MotoristSaved";
import MotoristProfile from "./pages/dashboard/motorist/MotoristProfile";

import Overview from "./pages/dashboard/Overview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/about" element={<About />} />

          {/* Auth Routes */}
          <Route path="/auth" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/forgot" element={<Forgot />} />
          <Route path="/auth/reset" element={<Reset />} />
          <Route path="/auth/activate" element={<Activate />} />
          <Route path="/auth/not-logged-in" element={<NotLoggedIn />} />
          <Route path="/auth/unauthorised" element={<Unauthorised />} />




          {/* Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Overview />} />

            {/* Admin Routes */}
            {/* <Route path="admin/overview" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminOverview /></ProtectedRoute>} /> */}
            <Route path="admin/users" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminUsers /></ProtectedRoute>} />
            <Route path="admin/listings" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminListings /></ProtectedRoute>} />
            <Route path="admin/reports" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminReports /></ProtectedRoute>} />

            {/* Host Routes */}
            {/* <Route path="host/overview" element={<ProtectedRoute allowedRoles={['HOST']}><HostOverview /></ProtectedRoute>} /> */}
            <Route path="host/listings" element={<ProtectedRoute allowedRoles={['HOST']}><MyListings /></ProtectedRoute>} />
            <Route path="host/calendar" element={<ProtectedRoute allowedRoles={['HOST']}><HostCalendar /></ProtectedRoute>} />
            <Route path="host/bookings" element={<ProtectedRoute allowedRoles={['HOST']}><HostBookings /></ProtectedRoute>} />
            <Route path="host/earnings" element={<ProtectedRoute allowedRoles={['HOST']}><Earnings /></ProtectedRoute>} />

            {/* Guest Routes */}
            <Route path="guest/bookings" element={<ProtectedRoute allowedRoles={['GUEST']}><MyBookings /></ProtectedRoute>} />
            <Route path="guest/saved" element={<ProtectedRoute allowedRoles={['GUEST']}><SavedSpots /></ProtectedRoute>} />
            <Route path="guest/profile" element={<ProtectedRoute allowedRoles={['GUEST']}><Profile /></ProtectedRoute>} />

            {/* Motorist Routes */}
            {/* <Route path="motorist/overview" element={<ProtectedRoute allowedRoles={['MOTORIST']}><MotoristOverview /></ProtectedRoute>} /> */}
            <Route path="motorist/bookings" element={<ProtectedRoute allowedRoles={['MOTORIST']}><MotoristBookings /></ProtectedRoute>} />
            <Route path="motorist/saved" element={<ProtectedRoute allowedRoles={['MOTORIST']}><MotoristSaved /></ProtectedRoute>} />
            <Route path="motorist/profile" element={<ProtectedRoute allowedRoles={['MOTORIST']}><MotoristProfile /></ProtectedRoute>} />

          </Route>


          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
