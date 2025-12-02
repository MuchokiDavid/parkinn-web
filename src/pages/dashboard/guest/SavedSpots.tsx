import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListingCard } from "@/components/ListingCard";

export default function SavedSpots() {
  // Mock saved spots - would come from API
  const savedSpots = [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Saved Spots</h1>
        <p className="text-muted-foreground">Your favorite parking locations</p>
      </div>

      {savedSpots.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {savedSpots.map((spot: any) => (
            <ListingCard key={spot.id} listing={spot} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No saved spots yet</p>
            <p className="text-muted-foreground mb-4">Save your favorite parking spots for quick access</p>
            <Button asChild>
              <a href="/search">Browse Listings</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}