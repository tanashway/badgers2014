import { Trophy, Star, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function TeamsPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Our Teams</h1>
          <p className="text-xl text-muted-foreground">Meet the Badgers 2014 competitive teams</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Premier Team */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-semibold">Premier</h2>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground">Our highest-level competitive team competing in regional tournaments.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span>4 Practice Sessions/Week</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span>Professional Coaching</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span>Regional Tournaments</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t">
              <p className="font-semibold">Coach: Michael Stevens</p>
              <p className="text-muted-foreground">UEFA A Licensed</p>
            </div>
          </Card>

          {/* Select Team */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-semibold">Select</h2>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground">Competitive team focused on player development and local competitions.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span>3 Practice Sessions/Week</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span>Advanced Training</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span>Local Tournaments</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t">
              <p className="font-semibold">Coach: Sarah Johnson</p>
              <p className="text-muted-foreground">USSF B Licensed</p>
            </div>
          </Card>

          {/* Development Team */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-semibold">Development</h2>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground">Entry-level team focusing on core skills and love for the game.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span>2 Practice Sessions/Week</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span>Fundamental Training</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span>Friendly Matches</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t">
              <p className="font-semibold">Coach: David Martinez</p>
              <p className="text-muted-foreground">USSF C Licensed</p>
            </div>
          </Card>
        </div>

        <div className="mt-16 bg-muted rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Team Selection Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">1. Evaluation</h3>
              <p className="text-muted-foreground">
                Players attend tryout sessions where coaches assess technical skills, tactical understanding, and physical abilities.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">2. Placement</h3>
              <p className="text-muted-foreground">
                Based on evaluations, players are placed in the most appropriate team for their development level.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">3. Development</h3>
              <p className="text-muted-foreground">
                Regular assessments ensure players continue to develop and can move between teams as they progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}