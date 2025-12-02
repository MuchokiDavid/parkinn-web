import { Home, Calendar, Heart, User, LayoutDashboard, Building2, DollarSign, Users, FileText, BarChart3, Bell, LogOut, ExternalLink } from "lucide-react";
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
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const guestItems = [
  { title: "My Bookings", url: "/dashboard/guest/bookings", icon: Calendar },
  { title: "Saved Spots", url: "/dashboard/guest/saved", icon: Heart },
  { title: "Profile", url: "/dashboard/guest/profile", icon: User },
];

const hostItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Listings", url: "/dashboard/host/listings", icon: Building2 },
  { title: "Calendar", url: "/dashboard/host/calendar", icon: Calendar },
  { title: "Bookings", url: "/dashboard/host/bookings", icon: Calendar },
  { title: "Earnings", url: "/dashboard/host/earnings", icon: DollarSign },
  { title: "Profile", url: "/dashboard/host/profile", icon: User },
];

const adminItems = [
  { title: "Overview", url: "/dashboard/admin/overview", icon: LayoutDashboard },
  { title: "Users", url: "/dashboard/admin/users", icon: Users },
  { title: "Listings", url: "/dashboard/admin/listings", icon: Building2 },
  { title: "Reports", url: "/dashboard/admin/reports", icon: BarChart3 },
  { title: "Profile", url: "/dashboard/admin/profile", icon: User },
];

const motoristItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Bookings", url: "/dashboard/motorist/bookings", icon: Calendar },
  { title: "Saved Spots", url: "/dashboard/motorist/saved", icon: Heart },
  { title: "Profile", url: "/dashboard/motorist/profile", icon: User },
]

function DashboardSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const items = user?.role === 'GUEST' ? guestItems
    : user?.role === 'HOST' ? hostItems
    : user?.role === 'MOTORIST' ? motoristItems
    : adminItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {user?.role === 'GUEST' ? 'Guest' : user?.role === 'HOST' ? 'Host' : 'Admin'} Dashboard
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
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/">
                    <Home className="h-4 w-4" />
                    {state !== "collapsed" && <span>Public Site</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout}>
                  <LogOut className="h-4 w-4" />
                  {state !== "collapsed" && <span>Logout</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export function DashboardLayout({ children }: { children?: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-6">
              <SidebarTrigger />
              <div className="flex-1" />
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">3</span>
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </header>
          <div className="p-6">
            {children?? <Outlet />}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
