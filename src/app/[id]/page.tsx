'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PageNotFound from '../personal-components/PageNotFound';
import ImageWithButtons from '../personal-components/Public/ImageWithButtons';
import Image from 'next/image';

interface Profile {
  username: string;
  email: string;
  name: string;
  image?: string;
  role: string;
  profile: {
    bio: string;
    _id: string;
  };
  links: Link[];
  createdAt: string;
  updatedAt: string;
}

interface Link {
  _id: string;
  url: string;
  shortDescription: string;
  images: string[];
  top: string;
  left: string;
  hashtags: string[];
  groupId: string;
}

const Page: React.FC = () => {
  const params = useParams();
  const { id } = params; // Extract user ID from URL

  const defaultHashtag = '#favorites'; // Set your default hashtag here
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(defaultHashtag); // Use defaultHashtag here
  const [filteredLinks, setFilteredLinks] = useState<Link[]>([]); // Links filtered by hashtag
  const [hashtags, setHashtags] = useState<string[]>([]); // All unique hashtags

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/user/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data: Profile = await response.json();
        setProfile(data);

        // Extract unique hashtags from all links
        const allHashtags = data.links.flatMap((link) => link.hashtags || []);
        setHashtags(Array.from(new Set(allHashtags))); // Remove duplicates

        // Filter links by the default selected hashtag
        setFilteredLinks(
          data.links.filter((link) => link.hashtags.includes(defaultHashtag)) || []
        );
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
  }, [id]);

  // Filter links by the currently selected hashtag
  useEffect(() => {
    if (selectedHashtag) {
      setFilteredLinks(
        selectedHashtag === 'All'
          ? profile?.links || [] // Show all links if "All" is selected
          : profile?.links.filter((link) => link.hashtags.includes(selectedHashtag)) || []
      );
    }
  }, [selectedHashtag, profile]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <PageNotFound />;
  }

  if (profile) {
    // Filter links with hashtag #favorites for GridLayout
    const favoriteLinks = profile.links.filter((link) =>
      link.hashtags.includes('#favorites')
    );

    return (
      <div className="bg-slate-100 min-h-screen">
        {/* Pass only links with #favorites to GridLayout */}
        <ImageWithButtons links={favoriteLinks} />

        {/* Hashtag Tabs */}
        <div className="bg-white shadow-md py-3 px-5 mb-1 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedHashtag('All')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              selectedHashtag === 'All'
                ? 'bg-red-700 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          {hashtags.map((hashtag, index) => (
            <button
              key={index}
              onClick={() => setSelectedHashtag(hashtag)}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                selectedHashtag === hashtag
                  ? 'bg-red-700 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {hashtag}
            </button>
          ))}
        </div>

        {/* Links List */}
        <div className="max-w-4xl mx-auto px-4 py-4">
          {filteredLinks.length > 0 ? (
            <ul className="flex flex-col space-y-4">
              {filteredLinks.map((link) => (
                <li
                  key={link._id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    {/* Link Short Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {link.shortDescription}
                      </h3>
                      {/* Link URL */}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-sm"
                      >
                        {link.url}
                      </a>
                    </div>
                    {/* Image Preview (Optional) */}
                    {link.images && link.images.length > 0 && (
                      <div className="relative w-16 h-16">
                        <Image
                          src={link.images[0]}
                          alt={link.shortDescription}
                          className="rounded-lg object-cover"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                  </div>
                  {/* Hashtags */}
                  {link.hashtags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {link.hashtags.map((hashtag, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs"
                        >
                          {hashtag}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-sm">No links available.</p>
          )}
        </div>
      </div>
    );
  }

  return null; // Render nothing if no profile data is available
};

export default Page;