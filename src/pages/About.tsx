import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, TrendingUp, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-gradient-hero py-20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              About ParkBnB
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              We're on a mission to make parking easier, more affordable, and better for our communities.
            </p>
          </div>
        </div>

        <div className="container py-16">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground">
                ParkBnB was founded in 2024 with a simple idea: there's unused parking space everywhere, 
                and people who need it. By connecting parking spot owners with drivers looking for convenient, 
                affordable parking, we're creating value for both sides while reducing urban congestion.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Trust & Safety</h3>
                  <p className="text-muted-foreground">
                    Every booking is protected with $1M insurance coverage. All hosts are verified 
                    and reviewed by our community.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Community First</h3>
                  <p className="text-muted-foreground">
                    We're building a platform that strengthens neighborhoods and helps neighbors 
                    support each other.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Economic Impact</h3>
                  <p className="text-muted-foreground">
                    Our hosts have earned over $50M collectively, turning unused space into 
                    meaningful income.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                  <p className="text-muted-foreground">
                    By optimizing existing spaces, we reduce the need for new parking infrastructure 
                    and urban sprawl.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center py-12">
              <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're looking for parking or have space to share, ParkBnB makes it easy.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
