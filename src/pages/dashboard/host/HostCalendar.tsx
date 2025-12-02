import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HostCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Availability Calendar</h1>
        <p className="text-muted-foreground">Manage your parking spot availability</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Select Dates</CardTitle>
            <CardDescription>Mark dates as available or unavailable</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bookings for {date?.toLocaleDateString()}</CardTitle>
            <CardDescription>View bookings for selected date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: '8:00 AM - 12:00 PM', listing: 'Downtown Garage', status: 'confirmed' },
                { time: '2:00 PM - 6:00 PM', listing: 'Downtown Garage', status: 'confirmed' },
                { time: '6:00 PM - 10:00 PM', listing: 'City Center Spot', status: 'pending' },
              ].map((booking, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{booking.listing}</p>
                    <p className="text-sm text-muted-foreground">{booking.time}</p>
                  </div>
                  <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                    {booking.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}