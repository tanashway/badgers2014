'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Clock, MapPin, Users, Filter } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

interface Event {
  id: string;
  title: string;
  type: 'practice' | 'game' | 'tournament';
  date: string;
  time: string;
  location: string;
  description: string;
  attendees: number;
}

const events: Event[] = [
  {
    id: '1',
    title: 'Team Practice',
    type: 'practice',
    date: '2024-03-25',
    time: '4:00 PM - 6:00 PM',
    location: 'Main Field',
    description: 'Regular team practice focusing on defensive tactics',
    attendees: 18
  },
  {
    id: '2',
    title: 'Game vs Eagles FC',
    type: 'game',
    date: '2024-03-30',
    time: '10:00 AM - 12:00 PM',
    location: 'City Stadium',
    description: 'League match against Eagles FC',
    attendees: 20
  },
  {
    id: '3',
    title: 'Spring Tournament',
    type: 'tournament',
    date: '2024-04-05',
    time: '9:00 AM - 5:00 PM',
    location: 'Regional Sports Complex',
    description: 'Annual spring tournament with teams from the region',
    attendees: 22
  }
];

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filters = [
    { label: 'All Events', value: 'all' },
    { label: 'Practices', value: 'practice' },
    { label: 'Games', value: 'game' },
    { label: 'Tournaments', value: 'tournament' }
  ];

  const filteredEvents = events.filter(event => 
    selectedFilter === 'all' || event.type === selectedFilter
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Schedule</h1>
          <p className="text-muted-foreground">Manage and view all team events</p>
        </div>
        <Button>
          Add New Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Upcoming Events</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Month
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CalendarIcon className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold truncate">{event.title}</h3>
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                  </div>
                  <p className="text-muted-foreground mb-2">{event.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {event.attendees} attending
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Calendar</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="space-y-2">
              {filters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={selectedFilter === filter.value ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedFilter(filter.value)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">12 Events</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Practice Sessions</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Games</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tournaments</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}