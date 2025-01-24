'use client';

import React, { useState, useEffect } from 'react';

interface Profile {
  userId: string;
  username: string;
  bio: string;
  website?: string;
  location?: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {profile ? (
        <div>
          <p><strong>User ID:</strong> {profile.userId}</p>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
          {profile.website && (
            <p><strong>Website:</strong> <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.website}</a></p>
          )}
          {profile.location && (
            <p><strong>Location:</strong> {profile.location}</p>
          )}
        </div>
      ) : (
        <p>No profile found.</p>
      )}
    </div>
  );
};

export default Profile;
