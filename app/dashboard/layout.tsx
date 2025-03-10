'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  // Authentication disabled for testing - set to true by default
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<any>({
    email: 'test@example.com', // Mock user for testing
    user_metadata: {
      avatar_url: null
    }
  });
  const router = useRouter();

  useEffect(() => {
    // Authentication disabled for testing
    // Uncomment the following code to re-enable authentication checks
    /*
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          router.push('/auth/login');
          return;
        }

        if (!data.session) {
          console.log('No active session found, redirecting to login');
          router.push('/auth/login');
          return;
        }

        setUser(data.session.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Session check failed:', error);
        router.push('/auth/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
    */
    
    // Mock authentication for testing
    setTimeout(() => {
      setIsLoading(false);
    }, 500); // Simulate a brief loading time
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}