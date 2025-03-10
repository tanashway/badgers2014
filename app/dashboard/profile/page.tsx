'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const getProfile = async () => {
      try {
        console.log('Fetching user session...');
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          console.error('Error getting session:', sessionError);
          router.push('/auth/login');
          return;
        }

        console.log('User session found:', session.user.id);
        setUser(session.user);
        setEmail(session.user.email || '');
        
        // Get profile data if it exists
        console.log('Fetching profile data for user:', session.user.id);
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profileError) {
          console.error('Error fetching profile:', profileError);
          if (profileError.code === 'PGRST116') {
            console.log('Profile not found, will create one on update');
          } else {
            setErrorMessage(`Profile fetch error: ${profileError.message}`);
          }
        }
        
        if (profile) {
          console.log('Profile found:', profile);
          setFullName(profile.full_name || '');
          setPhone(profile.phone || '');
          setAddress(profile.address || '');
          setBirthdate(profile.birthdate || '');
          setGender(profile.gender || '');
        } else {
          console.log('No profile found, using default values');
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        setErrorMessage(`Profile load error: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [router]);

  const updateProfile = async () => {
    if (!user) {
      console.error('Cannot update profile: No user found');
      return;
    }
    
    setUpdating(true);
    setErrorMessage('');
    
    try {
      console.log('Updating profile for user:', user.id);
      console.log('Profile data to update:', {
        id: user.id,
        full_name: fullName,
        phone: phone,
        address: address,
        birthdate: birthdate,
        gender: gender,
        updated_at: new Date().toISOString(),
      });
      
      // Update profile
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: fullName,
          email: email,
          phone: phone,
          address: address,
          birthdate: birthdate,
          gender: gender,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Profile update error:', error);
        setErrorMessage(`Update error: ${error.message} (Code: ${error.code})`);
        throw error;
      }
      
      console.log('Profile updated successfully');
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
      });
    } catch (error: any) {
      console.error('Profile update exception:', error);
      toast({
        variant: 'destructive',
        title: 'Update failed',
        description: error.message || 'Failed to update profile.',
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const userInitials = user?.email 
    ? user.email.substring(0, 2).toUpperCase() 
    : 'U';

  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      {errorMessage && (
        <div className="mb-6 p-4 border border-red-300 bg-red-50 text-red-800 rounded-md">
          <p className="font-medium">Error</p>
          <p>{errorMessage}</p>
        </div>
      )}
      
      <Tabs defaultValue="personal" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="contact">Contact Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email || 'User'} />
                  <AvatarFallback className="text-2xl">{userInitials}</AvatarFallback>
                </Avatar>
                <p className="text-sm text-muted-foreground text-center">
                  Profile pictures are managed through your authentication provider.
                </p>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={email}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-sm text-muted-foreground">
                    Email changes must be done through your authentication provider.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birthdate">Birthdate</Label>
                    <Input
                      id="birthdate"
                      type="date"
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Update your contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={updateProfile} disabled={updating} size="lg">
          {updating ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Manage your account preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Password</Label>
            <p className="text-sm text-muted-foreground">
              Password changes must be done through your authentication provider.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
          <Button 
            variant="destructive" 
            onClick={async () => {
              await supabase.auth.signOut();
              router.push('/');
            }}
          >
            Sign Out
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mt-8 p-4 border border-gray-200 rounded-md bg-gray-50">
        <h3 className="font-medium mb-2">Debug Information</h3>
        <p className="text-sm text-muted-foreground">User ID: {user?.id}</p>
        <p className="text-sm text-muted-foreground">Email: {user?.email}</p>
      </div>
    </div>
  );
} 