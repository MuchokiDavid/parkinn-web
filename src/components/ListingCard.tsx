import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Zap } from 'lucide-react';
import { Listing } from '@/lib/mockData';
import { useNavigate } from 'react-router-dom';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const navigate = useNavigate();

  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-elegant transition-all duration-300 border-2 hover:border-primary/50"
      onClick={() => navigate(`/listing/${listing.id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {listing.evCharger && (
          <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground">
            <Zap className="h-3 w-3 mr-1" />
            EV Charger
          </Badge>
        )}
      </div>

      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg line-clamp-1">{listing.title}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-semibold">{listing.rating}</span>
          </div>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          {listing.city}, {listing.state}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs">
              {listing.type}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {listing.dimensions}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${listing.price}</div>
            <div className="text-xs text-muted-foreground">per day</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
