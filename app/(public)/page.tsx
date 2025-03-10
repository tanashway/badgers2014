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
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
            Badgers 2014 Soccer Team
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Building champions through teamwork, discipline, and a love for the game.
            Join our community of young athletes and supportive families.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/programs">
                Join Our Team <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Badgers 2014?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We provide a supportive environment where young athletes can develop their skills,
              build confidence, and create lasting friendships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: 'Competitive Play',
                description: 'Participate in local leagues and tournaments to test and improve skills in real-game scenarios.'
              },
              {
                icon: Users,
                title: 'Team Building',
                description: 'Foster camaraderie, communication, and cooperation through team activities and shared goals.'
              },
              {
                icon: Calendar,
                title: 'Structured Program',
                description: 'Follow a well-designed training schedule that balances skill development with game experience.'
              },
              {
                icon: Star,
                title: 'Skilled Coaching',
                description: 'Learn from experienced coaches dedicated to developing both athletic ability and character.'
              },
              {
                icon: Shield,
                title: 'Safe Environment',
                description: 'Practice and play in a safe, supportive setting with proper equipment and supervision.'
              },
              {
                icon: Target,
                title: 'Individual Growth',
                description: 'Receive personalized feedback and development plans to help each player reach their potential.'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-accent/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Stay up to date with our latest games, practices, and team activities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                date: 'March 25, 2023',
                title: 'Team Practice',
                location: 'Main Soccer Complex',
                time: '4:00 PM - 6:00 PM'
              },
              {
                date: 'March 30, 2023',
                title: 'Game vs Eagles FC',
                location: 'City Stadium',
                time: '10:00 AM'
              },
              {
                date: 'April 5, 2023',
                title: 'Team Building Workshop',
                location: 'Community Center',
                time: '5:00 PM - 7:00 PM'
              }
            ].map((event, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <p className="text-sm font-medium text-primary mb-2">{event.date}</p>
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-muted-foreground mb-1">{event.location}</p>
                <p className="text-muted-foreground">{event.time}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/teams">
                View Full Calendar <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Parents & Players Say</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hear from our community about their experiences with Badgers 2014.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Being part of the Badgers has helped my son develop not just as a player, but as a person. The coaches focus on character as much as skills.",
                author: "Michael P., Parent"
              },
              {
                quote: "I've made my best friends on this team. We work hard together and have a lot of fun. The coaches push us to be our best.",
                author: "Jamie S., Player"
              },
              {
                quote: "The organization and communication from the team management is excellent. We always know what's happening and feel part of a real community.",
                author: "Sarah L., Parent"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="inline-block h-5 w-5 text-yellow-500" />
                  ))}
                </div>
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <p className="font-medium">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Team?</h2>
          <p className="text-lg text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            We're always looking for passionate players to join our community. Get in touch to learn about tryouts and registration.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Contact Us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20" asChild>
              <Link href="/programs">View Programs</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 