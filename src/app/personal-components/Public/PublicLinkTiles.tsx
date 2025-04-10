'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from "next/image";
import Link from 'next/link';

interface ILink {
  _id: string;
  url: string;
  shortDescription: string;
  description?: string; // Made optional to handle undefined cases
  images?: string[];
}

interface LinkListProps {
  username: string;
}

const TileList: React.FC<LinkListProps> = ({ username }) => {
  const [links, setLinks] = useState<ILink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const TEMP_IMAGE_URL = "https://picsum.photos/300/200";
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});

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

  const toggleDescription = (id: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle expanded state for specific item
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="px-4 py-4">
      {/* Render Links Exclusively in List View */}
      <div className="grid grid-cols-1 gap-6">
        {links.map((link) => (
          <div
            key={link._id}
            className="bg-white p-6 border rounded-lg shadow hover:shadow-md transition-shadow flex flex-col items-center"
          >
            {/* Image Section */}
            <div className="w-full overflow-hidden rounded mb-4 max-w-xs h-auto">
              <Image
                src={link.images && link.images[0] ? link.images[0] : TEMP_IMAGE_URL}
                alt={link.shortDescription}
                width={300}
                height={200}
                className="object-cover w-full"
              />
            </div>

            {/* Short Description */}
            <div className="mb-3 text-center">
              <p className="text-lg font-bold text-gray-800">{link.shortDescription}</p>
            </div>

            {/* Description */}
            <div
              className="mb-3 text-left cursor-pointer"
              onClick={() => toggleDescription(link._id)} // Make the entire div clickable
            >
              <pre style={{ fontFamily: "Arial" }} className="text-sm whitespace-pre-wrap">
                {expandedDescriptions[link._id]
                  ? link.description || "No description available" // Full description or fallback
                  : `${(link.description || "").slice(0, 50)}...`} {/* Truncated description */}
                {link.description && link.description.length > 50 && (
                  <span className="text-blue-500 underline text-xs ml-1">
                    {expandedDescriptions[link._id] ? "Show less" : "Read more"}
                  </span>
                )}
              </pre>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end w-full">
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors text-center text-sm"
              >
                Buy on TikTok
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TileList;