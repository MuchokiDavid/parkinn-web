import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Calendar, Clock, DollarSign } from 'lucide-react';

export default function MotoristBookings() {
  const activeBookings = [
    {
      id: 1,
      location: 'Downtown Garage',
      address: '123 Main St, City Center',
      date: 'Today, 2:00 PM - 5:00 PM',
      duration: '3 hours',
      price: '$15',
      status: 'active',
    },
    {
      id: 2,
      location: 'Airport Parking',
      address: '456 Airport Rd',
      date: 'Tomorrow, 8:00 AM - 1:00 PM',
      duration: '5 hours',
      price: '$25',
      status: 'upcoming',
    },
  ];

  const pastBookings = [
    {
      id: 3,
      location: 'Mall Parking Lot',
      address: '789 Shopping Blvd',
      date: 'Dec 10, 2024, 10:00 AM - 2:00 PM',
      duration: '4 hours',
      price: '$20',
      status: 'completed',
    },
    {
      id: 4,
      location: 'Street Parking',
      address: '321 Oak Street',
      date: 'Dec 8, 2024, 9:00 AM - 12:00 PM',
      duration: '3 hours',
      price: '$12',
      status: 'completed',
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      active: 'default',
      upcoming: 'secondary',
      completed: 'outline',
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const BookingCard = ({ booking }: { booking: typeof activeBookings[0] }) => (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{booking.location}</CardTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {booking.address}
            </p>
          </div>
          {getStatusBadge(booking.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{booking.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{booking.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold">{booking.price}</span>
        </div>
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">View Details</Button>
          {booking.status === 'upcoming' && (
            <Button variant="destructive" size="sm" className="flex-1">Cancel</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground">Manage your parking reservations</p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active & Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Bookings</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4 mt-6">
          {activeBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </TabsContent>
        <TabsContent value="past" className="space-y-4 mt-6">
          {pastBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
