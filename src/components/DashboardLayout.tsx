import { Home, Calendar, Heart, User, LayoutDashboard, Building2, DollarSign, Users, FileText, BarChart3 } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/stores/authStore";

const guestItems = [
  { title: "My Bookings", url: "/guest/bookings", icon: Calendar },
  { title: "Saved Spots", url: "/guest/saved", icon: Heart },
  { title: "Profile", url: "/guest/profile", icon: User },
];

const hostItems = [
  { title: "Overview", url: "/host/overview", icon: LayoutDashboard },
  { title: "My Listings", url: "/host/listings", icon: Building2 },
  { title: "Calendar", url: "/host/calendar", icon: Calendar },
  { title: "Bookings", url: "/host/bookings", icon: Calendar },
  { title: "Earnings", url: "/host/earnings", icon: DollarSign },
];

const adminItems = [
  { title: "Overview", url: "/admin/overview", icon: LayoutDashboard },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Listings", url: "/admin/listings", icon: Building2 },
  { title: "Reports", url: "/admin/reports", icon: BarChart3 },
];

function DashboardSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user } = useAuthStore();
  
  const items = user?.role === 'guest' ? guestItems 
    : user?.role === 'host' ? hostItems 
    : adminItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {user?.role === 'guest' ? 'Guest' : user?.role === 'host' ? 'Host' : 'Admin'} Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url}>
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-6">
              <SidebarTrigger />
              <div className="flex-1" />
            </div>
          </header>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}