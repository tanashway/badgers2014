'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AuthDebug() {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      setLoading(true);
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        }
        
        if (session) {
          setSession(session);
          setUser(session.user);
        }
      } catch (error) {
        console.error('Error in auth check:', error);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user || null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleManualRedirect = () => {
    router.push('/dashboard');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Authentication Debug</h1>
      
      {loading ? (
        <p>Loading authentication state...</p>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded">
            <h2 className="text-lg font-semibold mb-2">Authentication Status</h2>
            <p><strong>Authenticated:</strong> {user ? 'Yes' : 'No'}</p>
          </div>

          {user && (
            <div className="p-4 bg-gray-100 rounded">
              <h2 className="text-lg font-semibold mb-2">User Information</h2>
              <p><strong>User ID:</strong> {user.id}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Email Confirmed:</strong> {user.email_confirmed_at ? 'Yes' : 'No'}</p>
            </div>
          )}

          {session && (
            <div className="p-4 bg-gray-100 rounded">
              <h2 className="text-lg font-semibold mb-2">Session Information</h2>
              <p><strong>Session ID:</strong> {session.id}</p>
              <p><strong>Expires At:</strong> {new Date(session.expires_at * 1000).toLocaleString()}</p>
            </div>
          )}

          <div className="flex space-x-4">
            <Button onClick={handleManualRedirect}>
              Manually Go to Dashboard
            </Button>
            
            {user && (
              <Button variant="destructive" onClick={handleSignOut}>
                Sign Out
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 