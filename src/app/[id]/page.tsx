'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PageNotFound from "../personal-components/PageNotFound";
import PublicProfileHeader from '@/app/personal-components/Public/PublicProfileHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  groupId: string;
}

const Page: React.FC = () => {
  const params = useParams();
  const { id } = params; // Extract id from URL

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/user/${id}`, {
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

    fetchProfile();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <PageNotFound />;
  }

  if (profile) {
    return (
      <>
        <PublicProfileHeader 
          username={profile.username} 
          image={profile.image || 'default-image-url.jpg'} // Provide a default image URL
          bio={profile.profile.bio} 
          backgroundImage='bg.jpg' 
        />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                {profile.image && (
                  <img src={profile.image} alt={`${profile.name}'s profile`} className="rounded-full w-32 h-32 mb-4" />
                )}
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Role:</strong> {profile.role}</p>
                <p><strong>Bio:</strong> {profile.profile.bio}</p>
                <p><strong>Created At:</strong> {new Date(profile.createdAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(profile.updatedAt).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return null; // The page will show an error message if profile data is not found
};

export default Page;
