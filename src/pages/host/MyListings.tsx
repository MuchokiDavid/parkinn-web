import { useQuery } from "@tanstack/react-query";
import { Plus, MoreVertical, Eye, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getListings } from "@/lib/api";
import { useNavigate } from "react-router-dom";

export default function MyListings() {
  const navigate = useNavigate();
  const { data: listings, isLoading } = useQuery({
    queryKey: ['host-listings'],
    queryFn: () => getListings({}),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Listings</h1>
          <p className="text-muted-foreground">Manage your parking spots</p>
        </div>
        <Button onClick={() => navigate('/host/listings/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Listing
        </Button>
      </div>

      <div className="grid gap-4">
        {listings?.map((listing) => (
          <Card key={listing.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <img
                    src={listing.imageUrl}
                    alt={listing.title}
                    className="h-24 w-32 rounded-lg object-cover"
                  />
                  <div className="space-y-2">
                    <CardTitle>{listing.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{listing.address}</p>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{listing.type}</Badge>
                      <Badge variant="outline">${listing.price}/hr</Badge>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <div className="flex gap-6">
                  <span className="text-muted-foreground">
                    <span className="font-medium text-foreground">12</span> bookings this month
                  </span>
                  <span className="text-muted-foreground">
                    <span className="font-medium text-foreground">$456</span> earned
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}