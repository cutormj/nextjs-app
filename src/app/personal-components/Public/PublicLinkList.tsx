'use client';

import React, { useState, useEffect } from 'react';

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

const LinkList: React.FC<LinkListProps> = ({ username }) => {
  const [links, setLinks] = useState<ILink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLinks = async () => {
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
  };

  useEffect(() => {
    fetchLinks();
  }, [username]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-8">
      {/* <h2 className="text-xl font-bold mb-2">Links for {username}</h2> */}
      <ul>
        {links.map((link) => (
          <li key={link._id} className="mb-2">
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              {link.shortDescription}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinkList;
