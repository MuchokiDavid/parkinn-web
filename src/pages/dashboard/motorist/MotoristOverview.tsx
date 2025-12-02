import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MotoristOverview() {
  const stats = [
    { title: 'Active Bookings', value: '2', icon: Calendar, color: 'text-blue-600' },
    { title: 'Total Bookings', value: '12', icon: MapPin, color: 'text-green-600' },
    { title: 'Hours Parked', value: '48', icon: Clock, color: 'text-purple-600' },
    { title: 'Total Spent', value: '$240', icon: DollarSign, color: 'text-orange-600' },
  ];

  const upcomingBookings = [
    { id: 1, location: 'Downtown Garage', date: 'Today, 2:00 PM', duration: '3 hours', price: '$15' },
    { id: 2, location: 'Airport Parking', date: 'Tomorrow, 8:00 AM', duration: '5 hours', price: '$25' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome Back!</h1>
        <p className="text-muted-foreground">Here's your parking overview</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div>
                  <p className="font-medium">{booking.location}</p>
                  <p className="text-sm text-muted-foreground">{booking.date}</p>
                  <p className="text-sm text-muted-foreground">{booking.duration}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{booking.price}</p>
                </div>
              </div>
            ))}
            <Link to="/dashboard/motorist/bookings">
              <Button variant="outline" className="w-full">View All Bookings</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/search">
              <Button className="w-full">Find Parking</Button>
            </Link>
            <Link to="/dashboard/motorist/saved">
              <Button variant="outline" className="w-full">View Saved Spots</Button>
            </Link>
            <Link to="/dashboard/motorist/profile">
              <Button variant="outline" className="w-full">Edit Profile</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
