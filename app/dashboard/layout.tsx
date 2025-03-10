'use client';

import { useEffect, useState, useRef } from 'react';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const checkSession = async () => {
      try {
        // First, check localStorage for session
        const storedSession = localStorage.getItem('supabase.auth.token');
        console.log('Stored session:', storedSession);

        console.log('Checking dashboard session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          router.push('/auth/login?redirectedFrom=/dashboard');
          return;
        }

        if (!session) {
          console.log('No active session found, checking localStorage...');
          if (!storedSession) {
            console.log('No stored session found, redirecting to login');
            router.push('/auth/login?redirectedFrom=/dashboard');
            return;
          }
        }

        // If we have a session, set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, currentSession) => {
            console.log('Auth state changed:', event);
            if (event === 'SIGNED_OUT') {
              setIsAuthenticated(false);
              router.push('/auth/login');
            } else if (event === 'SIGNED_IN' && currentSession) {
              setUser(currentSession.user);
              setIsAuthenticated(true);
            }
          }
        );

        console.log('Session found:', session?.user?.email);
        setUser(session?.user || null);
        setIsAuthenticated(true);

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Session check failed:', error);
        router.push('/auth/login?redirectedFrom=/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}