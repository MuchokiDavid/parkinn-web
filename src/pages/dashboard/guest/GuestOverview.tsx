import { Calendar, Heart, DollarSign, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function GuestOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Guest Dashboard</h1>
        <p className="text-muted-foreground">Manage your bookings and saved spots</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">1 upcoming today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Spots</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Your favorites</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$342</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Cities visited</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
            <CardDescription>Your next reservations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { spot: 'Downtown Garage', date: 'Today, 2:00 PM', price: '$24' },
                { spot: 'Airport Parking Lot', date: 'Tomorrow, 8:00 AM', price: '$45' },
                { spot: 'City Center Spot', date: 'Dec 28, 10:00 AM', price: '$18' },
              ].map((booking, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{booking.spot}</p>
                    <p className="text-sm text-muted-foreground">{booking.date}</p>
                  </div>
                  <p className="font-semibold">{booking.price}</p>
                </div>
              ))}
            </div>
            <Button asChild className="w-full mt-4">
              <Link to="/guest/bookings">View All Bookings</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>What would you like to do?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/search">
                <MapPin className="mr-2 h-4 w-4" />
                Find Parking
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/guest/saved">
                <Heart className="mr-2 h-4 w-4" />
                View Saved Spots
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/guest/bookings">
                <Calendar className="mr-2 h-4 w-4" />
                Manage Bookings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
