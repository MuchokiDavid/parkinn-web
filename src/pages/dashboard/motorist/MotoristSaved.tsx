import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, DollarSign, Star } from 'lucide-react';

export default function MotoristSaved() {
  const savedSpots = [
    {
      id: 1,
      name: 'Downtown Garage',
      address: '123 Main St, City Center',
      type: 'Garage',
      price: '$5/hour',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=400',
    },
    {
      id: 2,
      name: 'Airport Parking',
      address: '456 Airport Rd',
      type: 'Outdoor',
      price: '$4/hour',
      rating: 4.6,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400',
    },
    {
      id: 3,
      name: 'Mall Parking Lot',
      address: '789 Shopping Blvd',
      type: 'Covered',
      price: '$6/hour',
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=400',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Saved Spots</h1>
        <p className="text-muted-foreground">Your favorite parking locations</p>
      </div>

      {savedSpots.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No saved spots yet</p>
            <p className="text-sm text-muted-foreground mb-4">Start saving your favorite parking locations</p>
            <Button>Find Parking</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedSpots.map((spot) => (
            <Card key={spot.id} className="overflow-hidden">
              <div className="relative h-48">
                <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 right-2"
                >
                  <Heart className="h-4 w-4 fill-current text-red-500" />
                </Button>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{spot.name}</CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {spot.address}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{spot.type}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{spot.rating}</span>
                    <span className="text-sm text-muted-foreground">({spot.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">{spot.price}</span>
                  </div>
                </div>
                <Button className="w-full">Book Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
