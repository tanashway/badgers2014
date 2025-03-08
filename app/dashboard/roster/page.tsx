'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Download,
  MessageSquare,
  ChevronDown,
  X
} from 'lucide-react';

interface Player {
  id: string;
  initials: string;
  name: string;
  position: string;
  positionAbbr: string;
  number: string;
  games: number;
  goals: number;
  assists: number;
  height: string;
  foot: 'Left' | 'Right';
  yearsOnTeam: number;
  stats: {
    minutesPlayed: number;
    passCompletion: number;
    shotsOnTarget: number;
  };
  recentGames: Array<{
    opponent: string;
    date: string;
    result: string;
    score: string;
  }>;
}

const players: Player[] = [
  {
    id: '1',
    initials: 'AJ',
    name: 'Alex Johnson',
    position: 'Forward',
    positionAbbr: 'FWD',
    number: '10',
    games: 11,
    goals: 8,
    assists: 5,
    height: "5'8\"",
    foot: 'Right',
    yearsOnTeam: 3,
    stats: {
      minutesPlayed: 990,
      passCompletion: 82,
      shotsOnTarget: 18
    },
    recentGames: [
      { opponent: 'Westside Strikers', date: 'May 24, 2025', result: 'W', score: '3-0' },
      { opponent: 'Metro FC', date: 'May 18, 2025', result: 'D', score: '1-1' },
      { opponent: 'Riverside United', date: 'May 11, 2025', result: 'W', score: '2-1' }
    ]
  },
  {
    id: '2',
    initials: 'AW',
    name: 'Avery Wilson',
    position: 'Forward',
    positionAbbr: 'FWD',
    number: '12',
    games: 7,
    goals: 3,
    assists: 1,
    height: "5'7\"",
    foot: 'Right',
    yearsOnTeam: 1,
    stats: {
      minutesPlayed: 630,
      passCompletion: 75,
      shotsOnTarget: 12
    },
    recentGames: []
  },
  // Add more players as needed
];

export default function RosterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('All Positions');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const teamStats = {
    totalPlayers: 12,
    forwards: 3,
    midfielders: 3,
    defenders: 4,
    goalkeepers: 2
  };

  const topPerformers = {
    goalsLeader: 'Alex Johnson',
    assistsLeader: 'Sam Williams',
    minutesLeader: 'Alex Johnson'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team Roster</h1>
          <p className="text-sm text-muted-foreground">Player profiles and team information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Roster
          </Button>
          <Button size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Team
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Left sidebar */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Filter By Position</label>
              <Button variant="outline" className="w-full justify-between">
                <span>{selectedPosition}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <Button variant="outline" className="w-full justify-between">
                <span>Name</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="p-4">
            <h3 className="font-medium mb-3">Team Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Players:</span>
                <span className="font-medium">{teamStats.totalPlayers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Forwards:</span>
                <span className="font-medium">{teamStats.forwards}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Midfielders:</span>
                <span className="font-medium">{teamStats.midfielders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Defenders:</span>
                <span className="font-medium">{teamStats.defenders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Goalkeepers:</span>
                <span className="font-medium">{teamStats.goalkeepers}</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-medium mb-3">Top Performers</h3>
            <div className="space-y-2 text-sm">
              <div>
                <div className="text-muted-foreground">Goals Leader</div>
                <div className="font-medium">{topPerformers.goalsLeader}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Assists Leader</div>
                <div className="font-medium">{topPerformers.assistsLeader}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Minutes Leader</div>
                <div className="font-medium">{topPerformers.minutesLeader}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Player grid */}
        <div className="col-span-3 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {players.map((player) => (
              <Card
                key={player.id}
                className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setSelectedPlayer(player)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-medium">{player.initials}</div>
                    <div className="text-xs font-medium px-2 py-1 bg-primary/10 rounded">
                      {player.positionAbbr}
                    </div>
                  </div>
                  <div className="text-sm font-medium">#{player.number}</div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="font-medium">{player.name}</div>
                    <div className="text-sm text-muted-foreground">{player.position}</div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-bold">{player.games}</div>
                      <div className="text-xs text-muted-foreground">Games</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{player.goals}</div>
                      <div className="text-xs text-muted-foreground">Goals</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{player.assists}</div>
                      <div className="text-xs text-muted-foreground">Assists</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-muted-foreground">Height:</div>
                      <div>{player.height}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Preferred Foot:</div>
                      <div>{player.foot}</div>
                    </div>
                  </div>

                  <div className="text-sm">
                    <div className="text-muted-foreground">Years on Team:</div>
                    <div>{player.yearsOnTeam}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Player Profile Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-x-4 top-[50%] translate-y-[-50%] max-w-2xl mx-auto bg-card p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Player Profile</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedPlayer(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold">{selectedPlayer.initials}</span>
                  </div>
                  <h3 className="text-xl font-bold">{selectedPlayer.name}</h3>
                  <div className="text-muted-foreground">{selectedPlayer.position}</div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 text-center">
                    <div>
                      <div className="text-2xl font-bold">{selectedPlayer.games}</div>
                      <div className="text-sm text-muted-foreground">Games</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{selectedPlayer.goals}</div>
                      <div className="text-sm text-muted-foreground">Goals</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{selectedPlayer.assists}</div>
                      <div className="text-sm text-muted-foreground">Assists</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Height</span>
                      <span className="font-medium">{selectedPlayer.height}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Preferred Foot</span>
                      <span className="font-medium">{selectedPlayer.foot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jersey Size</span>
                      <span className="font-medium">M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Years on Team</span>
                      <span className="font-medium">{selectedPlayer.yearsOnTeam}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Season Performance</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Minutes Played</span>
                          <span>{selectedPlayer.stats.minutesPlayed}</span>
                        </div>
                        <div className="h-2 bg-primary/10 rounded-full">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(selectedPlayer.stats.minutesPlayed / 1000) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Pass Completion</span>
                          <span>{selectedPlayer.stats.passCompletion}%</span>
                        </div>
                        <div className="h-2 bg-primary/10 rounded-full">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${selectedPlayer.stats.passCompletion}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Shots on Target</span>
                          <span>{selectedPlayer.stats.shotsOnTarget}</span>
                        </div>
                        <div className="h-2 bg-primary/10 rounded-full">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(selectedPlayer.stats.shotsOnTarget / 20) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Recent Games</h4>
                    <div className="space-y-2">
                      {selectedPlayer.recentGames.map((game, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded bg-accent/50"
                        >
                          <div>
                            <div className="font-medium">{game.opponent}</div>
                            <div className="text-sm text-muted-foreground">{game.date}</div>
                          </div>
                          <div className="text-sm font-medium">
                            {game.result} {game.score}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}