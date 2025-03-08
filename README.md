# Badgers 2014 Soccer Team Management System

A comprehensive web application for managing the Badgers 2014 soccer team, built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Public Website**: Home, About, Programs, Gallery, Teams, Contact pages
- **Authentication**: Secure login and registration system
- **Dashboard**: 
  - Team overview with upcoming events and announcements
  - Roster management with player profiles and statistics
  - Schedule management for practices, games, and tournaments
  - Media gallery for team photos and videos
  - Team messaging system
  - Settings for account management

## Technology Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Supabase (PostgreSQL database, authentication, storage)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Selatrade/badgers.git
   cd badgers
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Enhancement Suggestions

See [Suggestions.md](Suggestions.md) for a list of potential enhancements for the system.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 