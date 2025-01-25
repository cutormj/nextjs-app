'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PublicProfileHeader from "../personal-components/PublicProfileHeader";
import PageNotFound from "../personal-components/PageNotFound";

interface UserProfile {
  user: {
    name: string;
    email: string;
    username: string;
    image: string;
  };
  profile: {
    bio: string;
    website: string;
    location: string;
  };
}

const Page: React.FC = () => {
  const params = useParams();
  const { id } = params; // Extract id from URL

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`/api/user/${id}`);
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data.data); // Ensure it matches the API response structure
        } else {
          setUserProfile(null);
        }
      } catch {
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!userProfile) {
    return <PageNotFound />;
  }

  const userImage = userProfile.user.image || '/default-image.png';
  const usernameDisplay = userProfile.user.username || 'Unknown User';
  const bio = userProfile.profile.bio || '';

  return (
    <>
      <PublicProfileHeader username={usernameDisplay} image={userImage} bio={bio} />
    </>
  );
};

export default Page;
