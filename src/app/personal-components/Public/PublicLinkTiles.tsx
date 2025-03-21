'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

interface ILink {
  _id: string;
  url: string;
  shortDescription: string;
  images?: string[];
  groupId?: string;
}

interface LinkListProps {
  username: string;
}

const TileList: React.FC<LinkListProps> = ({ username }) => {
  const [links, setLinks] = useState<ILink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ILink | null>(null); // Track selected tile

  const TEMP_IMAGE_URL = "https://picsum.photos/300/200"; // Temporary image for links without images

  const fetchLinks = useCallback(async () => {
    try {
      const response = await fetch(`/api/user/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch links');
      }

      const data = await response.json();
      setLinks(data.links);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [username]);

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {links.map((link) => (
        <Dialog key={link._id} onOpenChange={() => setSelectedItem(link)}>
          <DialogTrigger>
            <Card className="cursor-pointer shadow-md">
              <Image
                src={link.images && link.images[0] ? link.images[0] : TEMP_IMAGE_URL}
                alt={link.shortDescription}
                width={300}
                height={200}
                className="rounded-t-lg"
              />
              <CardHeader>
                <CardTitle>{link.shortDescription}</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            {selectedItem && (
              <div className="text-center">
                <Image
                  src={
                    selectedItem.images && selectedItem.images[0]
                      ? selectedItem.images[0]
                      : TEMP_IMAGE_URL
                  }
                  alt={selectedItem.shortDescription}
                  width={400}
                  height={300}
                  className="mx-auto rounded-md"
                />
                <DialogTitle className="text-lg font-bold mt-4">
                  {selectedItem.shortDescription ?? "Item Details"}
                </DialogTitle>
                <p className="mt-2">{selectedItem.url}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default TileList;
