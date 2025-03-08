'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Upload,
  Image as ImageIcon,
  Video,
  Play,
  Calendar,
  ChevronRight,
  X
} from 'lucide-react';

interface Game {
  id: string;
  opponent: string;
  date: string;
  result: string;
  mediaCount: {
    photos: number;
    videos: number;
  };
}

interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  thumbnail: string;
  title: string;
  timestamp: string;
  gameId: string;
}

const games: Game[] = [
  {
    id: '1',
    opponent: 'Eagles FC',
    date: 'Mar 30, 2024',
    result: 'W 3-1',
    mediaCount: {
      photos: 24,
      videos: 5
    }
  },
  {
    id: '2',
    opponent: 'Metro United',
    date: 'Mar 23, 2024',
    result: 'W 2-0',
    mediaCount: {
      photos: 18,
      videos: 3
    }
  },
  {
    id: '3',
    opponent: 'Riverside FC',
    date: 'Mar 16, 2024',
    result: 'D 1-1',
    mediaCount: {
      photos: 15,
      videos: 4
    }
  }
];

const mediaItems: MediaItem[] = [
  {
    id: '1',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=2068',
    thumbnail: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=2068',
    title: 'Match Winning Goal',
    timestamp: '65:23',
    gameId: '1'
  },
  {
    id: '2',
    type: 'video',
    url: 'https://example.com/video1.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2070',
    title: 'First Half Highlights',
    timestamp: '45:00',
    gameId: '1'
  },
  {
    id: '3',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2070',
    thumbnail: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2070',
    title: 'Team Celebration',
    timestamp: '90:00',
    gameId: '1'
  }
];

export default function MediaPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'photos' | 'videos'>('all');

  const filteredMedia = mediaItems.filter(
    (item) => 
      (!selectedGame || item.gameId === selectedGame) &&
      (filter === 'all' || item.type === filter)
  );

  const selectedGameData = selectedGame 
    ? games.find(game => game.id === selectedGame)
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Media Gallery</h1>
          <p className="text-muted-foreground">Browse photos and videos from games</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Media
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Games Sidebar */}
        <Card className="p-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search games..."
                className="pl-9"
              />
            </div>

            <div className="space-y-2">
              <Button
                variant={selectedGame === null ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedGame(null)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                All Games
              </Button>
              {games.map((game) => (
                <Button
                  key={game.id}
                  variant={selectedGame === game.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedGame(game.id)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col items-start">
                      <span>{game.opponent}</span>
                      <span className="text-xs text-muted-foreground">{game.date}</span>
                    </div>
                    <div className="text-xs">
                      <span className="mr-2">📷 {game.mediaCount.photos}</span>
                      <span>🎥 {game.mediaCount.videos}</span>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Media Grid */}
        <div className="col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? "default" : "outline"}
                onClick={() => setFilter('all')}
              >
                All Media
              </Button>
              <Button
                variant={filter === 'photos' ? "default" : "outline"}
                onClick={() => setFilter('photos')}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Photos
              </Button>
              <Button
                variant={filter === 'videos' ? "default" : "outline"}
                onClick={() => setFilter('videos')}
              >
                <Video className="h-4 w-4 mr-2" />
                Videos
              </Button>
            </div>

            {selectedGameData && (
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">{selectedGameData.opponent}</span>
                <ChevronRight className="h-4 w-4" />
                <span>{selectedGameData.result}</span>
                <ChevronRight className="h-4 w-4" />
                <span>{selectedGameData.date}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {filteredMedia.map((item) => (
              <Card
                key={item.id}
                className="group relative cursor-pointer overflow-hidden"
                onClick={() => setSelectedMedia(item)}
              >
                <div className="aspect-video relative">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-3">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm opacity-80">{item.timestamp}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Media Viewer Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="fixed inset-x-4 top-[50%] translate-y-[-50%] max-w-6xl mx-auto">
            <Card className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 z-10"
                onClick={() => setSelectedMedia(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <div className="aspect-video">
                {selectedMedia.type === 'photo' ? (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-medium">{selectedMedia.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedMedia.timestamp}</p>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}