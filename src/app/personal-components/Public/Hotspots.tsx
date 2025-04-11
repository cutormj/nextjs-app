'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

interface ILink {
  _id: string;
  url: string;
  shortDescription: string;
  description?: string;
  top: string;
  left: string;
}

interface ImageWithButtonsProps {
  username: string; // Accepts username dynamically as a prop
}

const ImageWithButtons: React.FC<ImageWithButtonsProps> = ({ username }) => {
  const [links, setLinks] = useState<ILink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLinks = useCallback(async () => {
    try {
      const response = await fetch(`/api/user/${username}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch links');
      }

      const data = await response.json();
      setLinks(data.links);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <Image
        src="/me.jpg" // Replace with your image path
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
      />

      {/* Map fetched links into popover buttons */}
      {links.map((link) => (
        <Popover key={link._id}>
            <PopoverTrigger asChild>
            <button
                className="absolute flex items-center justify-center w-10 h-10 bg-red-700 text-white text-xl font-bold rounded-full hover:bg-opacity-80 focus:outline-none"
                style={{
                top: link.top, // Dynamically set from the database
                left: link.left, // Dynamically set from the database
                }}
            >
                +
            </button>
            </PopoverTrigger>
            <PopoverContent
            className="bg-white text-black shadow-lg rounded-lg p-4"
            align="center"
            sideOffset={8}
            >
            <p className="font-bold text-lg">{link.shortDescription}</p>
            {/* <p className="text-sm">{link.description || 'No description available'}</p> */}
            <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm mt-2 block"
            >
                Visit Link
            </a>
            </PopoverContent>
        </Popover>
))}
    </div>
  );
};

export default ImageWithButtons;