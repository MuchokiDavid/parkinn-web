import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { 
  Search, 
  Shield, 
  DollarSign, 
  Clock, 
  MapPin, 
  Star,
  CheckCircle,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import heroImage from '@/assets/hero-parking.jpg';

export default function Landing() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Modern parking garage" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative container py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground">
              Park Smarter, Not Harder
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90">
              Find affordable parking spots from local hosts, or earn money by sharing your unused space.
            </p>
            
            <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter location (city, address, or zip code)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-14 text-lg bg-background/95"
                />
              </div>
              <Button type="submit" size="lg" className="h-14 px-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </form>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-background/95 hover:bg-background"
                onClick={() => navigate('/search')}
              >
                Find Parking
              </Button>
              <Button 
                size="lg" 
                className="bg-background/95 text-foreground hover:bg-background/80"
                onClick={() => navigate('/auth')}
              >
                List Your Spot
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 border-b bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground mt-1">Active Listings</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">100K+</div>
              <div className="text-sm text-muted-foreground mt-1">Happy Parkers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">4.9</div>
              <div className="text-sm text-muted-foreground mt-1">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground mt-1">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ParkBnB?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The easiest way to find parking or earn extra income from your unused space.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-elegant">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Save Money</h3>
                <p className="text-muted-foreground">
                  Find parking spots up to 70% cheaper than traditional lots. Pay only for what you need.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-elegant">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Safe</h3>
                <p className="text-muted-foreground">
                  All hosts are verified. $1M insurance coverage on every booking for your peace of mind.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-elegant">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexible Hours</h3>
                <p className="text-muted-foreground">
                  Book hourly, daily, or monthly. Easy access with instant booking confirmation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Get started in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Search</h3>
              <p className="text-muted-foreground">
                Enter your destination and find available parking spots nearby.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Book</h3>
              <p className="text-muted-foreground">
                Choose your spot, select your dates, and confirm your booking instantly.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Park</h3>
              <p className="text-muted-foreground">
                Arrive and park with confidence. Access instructions sent to your phone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Host CTA */}
      <section className="py-20">
        <div className="container">
          <Card className="border-2 border-primary/20 bg-gradient-subtle shadow-elegant">
            <CardContent className="p-12">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <Zap className="h-12 w-12 text-primary mx-auto" />
                <h2 className="text-3xl md:text-4xl font-bold">Earn Money with Your Parking Spot</h2>
                <p className="text-lg text-muted-foreground">
                  Turn your unused driveway, garage, or parking space into a source of passive income. 
                  Join thousands of hosts earning an average of $400/month.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Free to list</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>You set the price</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Full insurance</span>
                  </div>
                </div>
                <Button size="lg" className="mt-4" onClick={() => navigate('/auth')}>
                  Start Hosting Today
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Thousands</h2>
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-primary text-primary" />
              ))}
              <span className="ml-2 text-lg font-semibold">4.9/5 from 12,450 reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Saved me so much time and money! Found a perfect spot right near my office for half the price of the lot."
                </p>
                <div className="font-semibold">Sarah M.</div>
                <div className="text-sm text-muted-foreground">San Francisco, CA</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "As a host, I'm earning $350/month from my unused driveway. The platform is super easy to use!"
                </p>
                <div className="font-semibold">David L.</div>
                <div className="text-sm text-muted-foreground">Oakland, CA</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The EV charging filter is a game changer. Found a garage with Level 2 charging for my Tesla."
                </p>
                <div className="font-semibold">Emily R.</div>
                <div className="text-sm text-muted-foreground">Palo Alto, CA</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
