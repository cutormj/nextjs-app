'use client';

import Navbar from '@/app/personal-components/Protected/Navbar';
import ProtectedHeader from '@/app/personal-components/Protected/ProtectedHeader';
import { useSession, signIn } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

interface Profile {
  username: string;
  email: string;
  name: string;
  image?: string;
  role: string;
  profile: {
    bio: string;
    _id: string;
  };
  links: Link[];
  createdAt: string;
  updatedAt: string;
}

interface Link {
  _id: string;
  url: string;
  shortDescription: string;
  images: string[];
  groupId: string; // Assuming groupId is a string. Adjust if it is an object or has a different type.
}

const ProtectedPage: React.FC = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn(); // Redirect to sign-in page if unauthenticated
    }
  }, [status]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data: Profile = await response.json();
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
          bio={profile.profile.bio || ''}
        />
        <Navbar username={profile.username || ''} bio={profile.profile.bio || ''} />
      </div>
    );
  }

  return null; // The page will redirect to sign-in if unauthenticated
};

export default ProtectedPage;
