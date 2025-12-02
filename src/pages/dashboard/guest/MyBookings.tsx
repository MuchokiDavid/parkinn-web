import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUserBookings } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";

export default function MyBookings() {
  const { user } = useAuthStore();
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['user-bookings', user?.id],
    queryFn: () => getUserBookings(user?.id ),
    enabled: !!user?.id,
  });

  if (isLoading) {
    return <div className="animate-pulse">Loading bookings...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground">View and manage your parking reservations</p>
      </div>

      <div className="grid gap-4">
        {bookings && bookings.length > 0 ? (
          bookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>{booking.listingTitle}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {booking.location}
                    </CardDescription>
                  </div>
                  <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                    {booking.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{booking.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{booking.startTime} - {booking.endTime}</span>
                  </div>
                  <div className="ml-auto font-semibold">
                    ${booking.totalPrice}
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">Get Directions</Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No bookings yet</p>
              <p className="text-muted-foreground mb-4">Start by finding a parking spot</p>
              <Button asChild>
                <a href="/search">Find Parking</a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
