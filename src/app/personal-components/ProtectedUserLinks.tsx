'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import AddLinkSheet from './AddLinkSheet';
// import { useParams } from 'next/navigation';

interface LinkData {
  _id: string;
  title: string;
  url: string;
  images: string[];
}

interface UserLinksProps {
  username: string;
}

const UserLinks: React.FC<UserLinksProps> = ({ username }) => {
  const [links, setLinks] = useState<LinkData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLinks = async () => {
    try {
      const response = await fetch(`/api/links/${username}`);
      if (response.ok) {
        const data = await response.json();
        setLinks(data.data);
      } else {
        setLinks([]);
      }
    } catch {
      setLinks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [username]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <AddLinkSheet username={username} onLinkAdded={fetchLinks} />
      {links.length === 0 ? (
        <div className="min-h-screen flex items-center justify-center">
          <p>No links found. Add a new link to get started!</p>
        </div>
      ) : (
        links.map(link => (
          <Card key={link._id} className="mb-4">
            <CardHeader>
              <CardTitle>{link.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                {link.images && link.images.map((image, index) => (
                  <Avatar key={index} className="w-24 h-24 mb-4">
                    <AvatarImage src={image} />
                    <AvatarFallback>IMG</AvatarFallback>
                  </Avatar>
                ))}
                <a href={link.url} target="_blank" className="text-blue-500 hover:underline">
                  {link.url}
                </a>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default UserLinks;
