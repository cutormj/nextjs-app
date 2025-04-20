'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PageNotFound from '../personal-components/PageNotFound';
import TemplateRenderer from '../personal-components/Templates/0TemplateRenderer';

interface Profile {
  username: string;
  email: string;
  name: string;
  image?: string;
  hotspotImage: string;
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
  const { id } = params;

  const defaultHashtag = '#favorites';
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(defaultHashtag);
  const [filteredLinks, setFilteredLinks] = useState<Link[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);

  const brandingColors = {
    primary: "#000000", // Black
    secondary: "#FFFFFF", // White
    accent: "#CCCCCC", // Light Gray for accents
    background: "#FFFFFF", // White background
    textPrimary: "#000000", // Black text
    textSecondary: "#666666", // Dark Gray for secondary text
  };

  const componentsConfig = [
    {
      type: "ImageWithButtons",
      props: {
        title: "Explore Our Interactive Hotspot", // Title for the section
        description: "Click on the hotspots to learn more about each item.", // Description for the section
        links: profile?.links.filter((link) => link.hashtags.includes("#favorites")) || [], // Filtered links
        hotspotImage: profile?.hotspotImage || "", // Background image for the right section
        backgroundImage: "https://i.pinimg.com/736x/87/d5/2f/87d52f42221de0c43a6c67c133004fc6.jpg", // Background image for the entire section
        buttonLabel: "Learn More", // Label for the action button
        buttonLink: "/learn-more", // Link for the action button
      },
    },
    {
      type: "HashtagTabs",
      props: {
        hashtags,
        selectedHashtag,
        setSelectedHashtag,
      },
    },
    {
      type: "LinksList",
      props: {
        filteredLinks,
      },
    },
    {
      type: "SkillElevationHero",
      props: {
        title: "Develop Your Skills in a New and Unique Way",
        description:
          "Transform your expertise with our curated courses, designed for interactive and engaging learning experiences.",
        stats: [
          { icon: "📚", label: "50+ Online Courses" },
          { icon: "👥", label: "10k+ Online Students" },
        ],
        imageUrl: "https://i.pinimg.com/736x/c8/62/28/c86228c22a42eec00a9bed2d84642dab.jpg",
        link: {
          label: "Explore Courses",
          href: "/courses",
          style: { borderRadius: "8px" },
        },
        colors: brandingColors,
      },
    },
    // Other components...
  ];

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

        const allHashtags = data.links.flatMap((link) => link.hashtags || []);
        setHashtags(Array.from(new Set(allHashtags)));

        setFilteredLinks(
          data.links.filter((link) => link.hashtags.includes(defaultHashtag)) || []
        );
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  useEffect(() => {
    if (selectedHashtag) {
      setFilteredLinks(
        selectedHashtag === 'All'
          ? profile?.links || []
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
    return (
      <div className="bg-slate-100 min-h-screen">
        {/* TemplateRenderer */}
        <TemplateRenderer componentsConfig={componentsConfig} />
      </div>
    );
  }

  return null;
};

export default Page;