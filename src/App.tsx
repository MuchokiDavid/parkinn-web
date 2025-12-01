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
import MyBookings from "./pages/guest/MyBookings";
import SavedSpots from "./pages/guest/SavedSpots";
import Profile from "./pages/guest/Profile";

// Host pages
import HostOverview from "./pages/host/HostOverview";
import MyListings from "./pages/host/MyListings";
import HostCalendar from "./pages/host/HostCalendar";
import HostBookings from "./pages/host/HostBookings";
import Earnings from "./pages/host/Earnings";

// Admin pages
import AdminOverview from "./pages/admin/AdminOverview";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminListings from "./pages/admin/AdminListings";
import AdminReports from "./pages/admin/AdminReports";

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

                    <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['guest']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/guest/bookings" replace />} />
            <Route path="bookings" element={<MyBookings />} />
            <Route path="saved" element={<SavedSpots />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Guest Dashboard Routes */}
          <Route
            path="/guest"
            element={
              <ProtectedRoute allowedRoles={['guest']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/guest/bookings" replace />} />
            <Route path="bookings" element={<MyBookings />} />
            <Route path="saved" element={<SavedSpots />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Host Dashboard Routes */}
          <Route
            path="/host"
            element={
              <ProtectedRoute allowedRoles={['host']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/host/overview" replace />} />
            <Route path="overview" element={<HostOverview />} />
            <Route path="listings" element={<MyListings />} />
            <Route path="calendar" element={<HostCalendar />} />
            <Route path="bookings" element={<HostBookings />} />
            <Route path="earnings" element={<Earnings />} />
          </Route>

          {/* Admin Dashboard Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/overview" replace />} />
            <Route path="overview" element={<AdminOverview />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="listings" element={<AdminListings />} />
            <Route path="reports" element={<AdminReports />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
