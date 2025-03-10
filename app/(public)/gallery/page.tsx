import { Card } from '@/components/ui/card';

interface GalleryImage {
  url: string;
  title: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  {
    url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=2068',
    title: 'Training Session',
    category: 'Practice'
  },
  {
    url: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2070',
    title: 'Match Day',
    category: 'Games'
  },
  {
    url: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=2069',
    title: 'Team Building',
    category: 'Events'
  },
  {
    url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2070',
    title: 'Skills Development',
    category: 'Practice'
  },
  {
    url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2093',
    title: 'Tournament Champions',
    category: 'Events'
  },
  {
    url: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=2049',
    title: 'Youth Training',
    category: 'Practice'
  },
  {
    url: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=2070',
    title: 'Team Celebration',
    category: 'Events'
  },
  {
    url: 'https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?q=80&w=2070',
    title: 'Game Preparation',
    category: 'Games'
  },
  {
    url: 'https://images.unsplash.com/photo-1577706552105-f95d81e4cf27?q=80&w=2070',
    title: 'Team Spirit',
    category: 'Events'
  }
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Photo Gallery</h1>
          <p className="text-xl text-muted-foreground">Capturing moments of excellence and team spirit</p>
        </div>

        {/* Categories */}
        <div className="flex justify-center gap-4 mb-8">
          {['All', 'Practice', 'Games', 'Events'].map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <Card
              key={index}
              className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={image.url}
                  alt={image.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h3 className="text-lg font-semibold">{image.title}</h3>
                    <p className="text-sm opacity-80">{image.category}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Upload Section for Admins (to be implemented) */}
        <div className="mt-16 bg-muted rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Share Your Moments</h2>
          <p className="text-muted-foreground mb-6">
            Are you a team member? Share your photos and help us capture the team&apos;s journey.
          </p>
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Upload Photos
          </button>
        </div>
      </div>
    </div>
  );
} 