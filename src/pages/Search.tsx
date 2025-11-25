import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ListingCard } from '@/components/ListingCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');

  const { data: listings, isLoading } = useQuery({
    queryKey: ['listings', searchParams.get('q')],
    queryFn: () => api.searchListings(searchParams.get('q') || undefined),
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Search Bar */}
        <div className="border-b bg-muted/30">
          <div className="container py-6">
            <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl">
              <Input
                type="text"
                placeholder="Search by city, address, or zip code..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <SearchIcon className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button type="button" variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </form>
          </div>
        </div>

        {/* Results */}
        <div className="container py-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : listings && listings.length > 0 ? (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold">
                  {listings.length} {listings.length === 1 ? 'spot' : 'spots'} available
                </h1>
                {searchParams.get('q') && (
                  <p className="text-muted-foreground">
                    Showing results for "{searchParams.get('q')}"
                  </p>
                )}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No results found</h2>
              <p className="text-muted-foreground">
                Try adjusting your search or browse all available spots
              </p>
              <Button className="mt-4" onClick={() => { setSearchInput(''); setSearchParams({}); }}>
                View All Spots
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
