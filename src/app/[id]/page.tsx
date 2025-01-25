'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PublicProfileHeader from "../personal-components/PublicProfileHeader";
import PageNotFound from "../personal-components/PageNotFound";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@/components/ui/carousel';
import { PublicUserLinkImages } from '../personal-components/PublicUserLinkImages';

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

interface LinkData {
  _id: string;
  title: string;
  url: string;
  images: string[];
}

const Page: React.FC = () => {
  const params = useParams();
  const { id } = params; // Extract id from URL

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userLinks, setUserLinks] = useState<LinkData[]>([]);
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

    const fetchUserLinks = async () => {
      try {
        const response = await fetch(`/api/links/${id}`);
        if (response.ok) {
          const data = await response.json();
          setUserLinks(data.data); // Ensure it matches the API response structure
        } else {
          setUserLinks([]);
        }
      } catch {
        setUserLinks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    fetchUserLinks();
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
      <div className="max-w-2xl mx-auto px-4 py-8">
        {userLinks.length === 0 ? (
          <div className="min-h-screen flex items-center justify-center">
            <p>No links found.</p>
          </div>
        ) : (
          userLinks.map(link => (
            <Card key={link._id} className="mb-4">
              <CardHeader>
                <CardTitle>{link.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <PublicUserLinkImages images={link.images} />
                  {/* {link.images.length > 0 && (
                    
                  
                  )} */}
                  <a href={link.url} target="_blank" className="text-blue-500 hover:underline">
                    {link.url}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className='flex justify-center'>
        
      </div>
    </>
  );
};

export default Page;
