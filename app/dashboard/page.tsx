'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Trophy, Activity, Bell, MessageSquare } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, John</h1>
          <p className="text-muted-foreground">Here's what's happening with your team</p>
        </div>
        <Button variant="outline" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 space-y-2">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Next Practice</h3>
          </div>
          <p className="text-2xl font-bold">Today, 4:00 PM</p>
          <p className="text-muted-foreground">Main Soccer Complex</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Next Game</h3>
          </div>
          <p className="text-2xl font-bold">Saturday, 10:00 AM</p>
          <p className="text-muted-foreground">vs Eagles FC</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Team Attendance</h3>
          </div>
          <p className="text-2xl font-bold">18/20 Players</p>
          <p className="text-muted-foreground">Available for next game</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Season Stats</h3>
          </div>
          <p className="text-2xl font-bold">Won 8/10</p>
          <p className="text-muted-foreground">Games this season</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Recent Announcements</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <p className="font-medium">New Training Schedule</p>
              <p className="text-muted-foreground">Updated practice times for next week</p>
              <p className="text-sm text-muted-foreground">2 hours ago</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <p className="font-medium">Tournament Registration</p>
              <p className="text-muted-foreground">Spring Cup registration now open</p>
              <p className="text-sm text-muted-foreground">1 day ago</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Team Chat</h3>
            <Button variant="outline" size="sm">Open Chat</Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Coach Mike</p>
                <p className="text-muted-foreground">Great practice today, team! Remember to...</p>
                <p className="text-sm text-muted-foreground">30 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-muted-foreground">Can someone give me a ride to...</p>
                <p className="text-sm text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Upcoming Schedule</h3>
          <Button variant="outline" size="sm">Full Calendar</Button>
        </div>
        <div className="space-y-4">
          {[
            {
              date: 'Mon, Mar 25',
              time: '4:00 PM - 6:00 PM',
              title: 'Team Practice',
              location: 'Main Field'
            },
            {
              date: 'Wed, Mar 27',
              time: '4:00 PM - 6:00 PM',
              title: 'Skills Training',
              location: 'Training Ground'
            },
            {
              date: 'Sat, Mar 30',
              time: '10:00 AM',
              title: 'Game vs Eagles FC',
              location: 'City Stadium'
            }
          ].map((event, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
              <div className="text-center">
                <p className="font-semibold">{event.date.split(',')[0]}</p>
                <p className="text-sm text-muted-foreground">{event.date.split(',')[1]}</p>
              </div>
              <div className="flex-1">
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-muted-foreground">{event.time}</p>
              </div>
              <p className="text-sm text-muted-foreground">{event.location}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}