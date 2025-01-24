'use client';

import ProtectedHeader from '@/app/personal-components/ProtectedHeader';
import { useSession, signIn } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

interface Profile {
  userId: string;
  username: string;
  bio: string;
  website?: string;
  location?: string;
  image?: string;
  email?: string;
  name?: string;
}

const ProtectedPage: React.FC = () => {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn(); // Redirect to sign-in page if unauthenticated
    }
  }, [status]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/profile/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchProfile();
    }
  }, [session]);

  if (status === 'loading' || loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (session && profile) {
    return (
      <div>
        <ProtectedHeader 
          image={profile.image || session.user?.image || ''} 
          name={profile.name || session.user?.name || ''}
          email={profile.email || session.user?.email || ''}
          username={profile.username || ''}
          bio={profile.bio || ''}
          location={profile.location || ''}
          website={profile.website || ''}
        />
        <div className="grid grid-flow-col auto-cols-max">
          <div className='bg-red-600'>01</div>
          <div className='bg-blue-900'>02</div>
          <div className='bg-green-400'>03</div>
        </div>
      </div>
    );
  }

  return null; // The page will redirect to sign-in if unauthenticated
};

export default ProtectedPage;
