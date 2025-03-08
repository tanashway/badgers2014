import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy, Users, Calendar, Star, Shield, Target } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[url('https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2070')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Badgers 2014
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Building champions through dedication, teamwork, and excellence in youth soccer.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="text-lg">
              <Link href="/auth/register">Join Our Team</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-lg bg-white/10 text-white hover:bg-white/20">
              <Link href="/programs">View Programs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold">150+</p>
              <p className="text-lg opacity-90">Active Players</p>
            </div>
            <div>
              <p className="text-4xl font-bold">12</p>
              <p className="text-lg opacity-90">Expert Coaches</p>
            </div>
            <div>
              <p className="text-4xl font-bold">25+</p>
              <p className="text-lg opacity-90">Championships</p>
            </div>
            <div>
              <p className="text-4xl font-bold">10</p>
              <p className="text-lg opacity-90">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Programs</h2>
            <p className="text-xl text-muted-foreground">Comprehensive training for all skill levels</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Youth Development</h3>
              <p className="text-muted-foreground mb-4">
                Foundation training for young players focusing on core skills and love for the game.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link href="/programs#youth">Learn More</Link>
              </Button>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Target className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Elite Training</h3>
              <p className="text-muted-foreground mb-4">
                Advanced programs for competitive players aiming for excellence.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link href="/programs#elite">Learn More</Link>
              </Button>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Star className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Goalkeeper Academy</h3>
              <p className="text-muted-foreground mb-4">
                Specialized training for aspiring goalkeepers with professional coaches.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link href="/programs#goalkeeper">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Badgers 2014?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Trophy className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Professional Coaching</h3>
                    <p className="text-muted-foreground">
                      UEFA and USSF licensed coaches with professional playing experience.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Individual Development</h3>
                    <p className="text-muted-foreground">
                      Personalized training plans and progress tracking for each player.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Calendar className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Year-round Programs</h3>
                    <p className="text-muted-foreground">
                      Continuous development with indoor and outdoor facilities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=2068"
                alt="Soccer training"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg hidden md:block">
                <p className="text-2xl font-bold">10+</p>
                <p>Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Badgers Family</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Be part of a team that values growth, sportsmanship, and excellence both on and off the field.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="group"
            >
              <Link href="/auth/register">
                Register Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-white/10 hover:bg-white/20"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}