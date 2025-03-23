'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

interface ILink {
  _id: string;
  url: string;
  shortDescription: string;
  images?: string[];
}

interface LinkListProps {
  username: string;
}

const TileList: React.FC<LinkListProps> = ({ username }) => {
  const [links, setLinks] = useState<ILink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'tile' | 'list'>('list'); // Default to 'list' for mobile
  const [selectedItem, setSelectedItem] = useState<ILink | null>(null);
  const TEMP_IMAGE_URL = "https://picsum.photos/300/200";

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

  // Detect screen size to set the default view mode
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode('list'); // Mobile devices
      } else {
        setViewMode('tile'); // Larger screens
      }
    };

    // Set initial mode and listen for resize events
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-4">
      {/* View Mode Buttons */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setViewMode('tile')}
          className={`px-4 py-2 mr-2 rounded ${viewMode === 'tile' ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}
        >
          Tile View
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`px-4 py-2 rounded ${viewMode === 'list' ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}
        >
          List View
        </button>
      </div>

      {/* Render Links Based on View Mode */}
      {viewMode === 'tile' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link) => (
            <Dialog key={link._id} onOpenChange={() => setSelectedItem(link)}>
              <div className="cursor-pointer shadow-md w-full max-w-sm mx-auto p-4 rounded-md border">
                <Image
                  src={link.images && link.images[0] ? link.images[0] : TEMP_IMAGE_URL}
                  alt={link.shortDescription}
                  width={300}
                  height={200}
                  className="h-48 w-full object-cover rounded-md"
                />
                <div className="mt-2">
                  <p className="font-bold text-center">{link.shortDescription}</p>
                  <div className="mt-3 flex justify-center space-x-2">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600 text-center text-sm"
                    >
                      Buy on TikTok
                    </a>
                    <DialogTrigger asChild>
                      <button className="underline text-blue-500 text-sm">Read more</button>
                    </DialogTrigger>
                  </div>
                </div>
              </div>
              <DialogContent>
                {selectedItem && (
                  <div>
                    <DialogTitle className="text-lg font-bold mb-4 text-center">
                      {selectedItem.shortDescription ?? "Item Details"}
                    </DialogTitle>
                    <Carousel className="w-full max-w-lg mx-auto">
                      <CarouselContent>
                        {(selectedItem.images && selectedItem.images.length > 0
                          ? selectedItem.images
                          : [TEMP_IMAGE_URL]
                        ).map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="p-1">
                              <Image
                                src={image}
                                alt={selectedItem.shortDescription}
                                width={400}
                                height={300}
                                className="rounded-md object-cover"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                    <p className="mt-4 text-center">
                      <a
                        href={selectedItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {selectedItem.url}
                      </a>
                    </p>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {links.map((link) => (
            <div
              key={link._id}
              className="grid grid-cols-5 gap-3 items-center p-3 border rounded shadow-md"
            >
              {/* Image Column */}
              <div className="col-span-1">
                <div className="h-20 w-full overflow-hidden rounded">
                  <Image
                    src={link.images && link.images[0] ? link.images[0] : TEMP_IMAGE_URL}
                    alt={link.shortDescription}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              {/* Description Column */}
              <div className="col-span-3">
                <p className="text-sm font-bold">{link.shortDescription}</p>
              </div>
              {/* Actions Column */}
              <div className="col-span-1 flex flex-col gap-2">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-3 py-1 rounded hover:bg-gray-600 text-center text-xs"
                >
                  Buy on TikTok
                </a>
                <Dialog key={link._id} onOpenChange={() => setSelectedItem(link)}>
                  <DialogTrigger asChild>
                    <button className="text-xs underline text-blue-500">Read more</button>
                  </DialogTrigger>
                  <DialogContent>
                    {selectedItem && (
                      <div>
                        <DialogTitle className="text-lg font-bold mb-4 text-center">
                          {selectedItem.shortDescription ?? "Item Details"}
                        </DialogTitle>
                        <Carousel className="w-full max-w-lg mx-auto">
                          <CarouselContent>
                            {(selectedItem.images && selectedItem.images.length > 0
                              ? selectedItem.images
                              : [TEMP_IMAGE_URL]
                            ).map((image, index) => (
                              <CarouselItem key={index}>
                                <div className="p-1">
                                  <Image
                                    src={image}
                                    alt={selectedItem.shortDescription}
                                    width={400}
                                    height={300}
                                    className="rounded-md object-cover"
                                  />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                        <p className="mt-4 text-center">
                          <a
                            href={selectedItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {selectedItem.url}
                          </a>
                        </p>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TileList;