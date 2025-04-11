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
  images?: string[]; // Added for image handling
}

interface ImageWithButtonsProps {
  username: string; // Accepts username dynamically as a prop
}

const ImageWithButtons: React.FC<ImageWithButtonsProps> = ({ username }) => {
  const [links, setLinks] = useState<ILink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const DEFAULT_IMAGE = '/placeholder-image.jpg'; // Path to your placeholder image

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
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">Error: {error}</div>;
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
        className="rounded-lg"
      />

      {/* Map fetched links into popover buttons */}
      {links.map((link) => (
        <Popover key={link._id}>
          <PopoverTrigger asChild>
            <div
              className="absolute flex flex-col items-center text-center group"
              style={{
                top: link.top, // Dynamically set from the database
                left: link.left, // Dynamically set from the database
              }}
            >
              {/* Button */}
              <button
                className="w-12 h-12 bg-red-700 text-white text-2xl font-bold rounded-full shadow-md hover:bg-red-600 focus:outline-none group-hover:scale-105 transition-transform"
              >
                +
              </button>
              {/* Tooltip-like Label */}
              {/* <span className="mt-2 text-xs text-white bg-black bg-opacity-70 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                {link.shortDescription}
              </span> */}
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="bg-red-700 text-white shadow-xl rounded-lg p-4 max-w-sm "
            align="center"
            sideOffset={8}
          >
            {/* Display the image dynamically */}
            <div className="relative w-full h-40 mb-3">
              <Image
                src={link.images && link.images[0] ? link.images[0] : DEFAULT_IMAGE}
                alt={link.shortDescription}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <h3 className="font-bold text-lg mb-2">{link.shortDescription}</h3>
            {/* <p className="text-sm text-gray-700">{link.description || 'No description available.'}</p> */}
            <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3 text-red-950 bg-white hover:text-white hover:bg-red-950 font-semibold rounded-md px-4 py-2 shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-center"
                >
                🚀 Buy on TikTok
            </a>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
};

export default ImageWithButtons;