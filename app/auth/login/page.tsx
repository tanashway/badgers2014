'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

// Helper function to get the base URL
const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL || // Set this to your site URL in production env.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.endsWith('/') ? url : `${url}/`;
  return url;
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const redirectPath = searchParams.get('redirectedFrom') || '/dashboard';
  const mounted = useRef(false);

  // Check if user is already logged in
  useEffect(() => {
    if (mounted.current) return; // Only run once
    mounted.current = true;

    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Session check error:', error);
          return;
        }
        if (session) {
          console.log('Session found in login page, redirecting to:', redirectPath);
          router.push(redirectPath);
        }
      } catch (error) {
        console.error('Session check failed:', error);
      }
    };
    
    checkSession();
  }, [redirectPath, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    setLoading(true);

    if (!email || !password) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter both email and password.',
      });
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting to sign in...');
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        throw error;
      }

      if (!data?.session) {
        console.error('No session returned after sign in');
        throw new Error('Authentication failed');
      }

      console.log('Sign in successful, session:', data.session);

      // Store the session token
      localStorage.setItem('supabase.auth.token', data.session.access_token);
      console.log('Session token stored in localStorage');

      toast({
        title: 'Welcome back!',
        description: 'Successfully signed in.',
      });

      // Add a small delay before navigation
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Redirecting to:', redirectPath);
      router.push(redirectPath);
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: error.message || 'Invalid email or password.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Button
              variant="link"
              className="p-0 h-auto font-semibold"
              onClick={() => router.push('/auth/register')}
            >
              Register
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}