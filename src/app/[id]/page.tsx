"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageNotFound from "../personal-components/PageNotFound";
import TemplateRenderer from "../personal-components/Templates/0TemplateRenderer";
import Loading from "../personal-components/Templates/Loading";

interface Profile {
  username: string;
  email: string;
  name: string;
  image?: string;
  hotspotImage: string;
  role: string;
  profile: { bio: string; _id: string };
  links: Link[];
  branding?: BrandingColors; // ✅ Fetch branding dynamically
  createdAt: string;
  updatedAt: string;
}

interface BrandingColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
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

  const defaultHashtag = "#favorites";
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [brandingColors, setBrandingColors] = useState<BrandingColors | null>(null);
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(defaultHashtag);
  const [filteredLinks, setFilteredLinks] = useState<Link[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/user/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data: Profile = await response.json();
        setProfile(data);

        // ✅ Set branding colors dynamically or fallback to defaults
        setBrandingColors(data.branding ?? {
          primary: "#1E293B",
          secondary: "#F8FAFC",
          accent: "#EF4444",
          background: "#E2E8F0",
          textPrimary: "#FFFFFF",
          textSecondary: "#64748B",
        });

        const allHashtags = data.links.flatMap((link) => link.hashtags || []);
        setHashtags(Array.from(new Set(allHashtags)));

        setFilteredLinks(data.links.filter((link) => link.hashtags.includes(defaultHashtag)) || []);

        document.title = `${data.username} - bio`;
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  useEffect(() => {
    if (selectedHashtag) {
      setFilteredLinks(
        selectedHashtag === "All"
          ? profile?.links || []
          : profile?.links.filter((link) => link.hashtags.includes(selectedHashtag)) || []
      );
    }
  }, [selectedHashtag, profile]);

  useEffect(() => {
    if (brandingColors) {
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", brandingColors.primary);
      } else {
        const meta = document.createElement("meta");
        meta.name = "theme-color";
        meta.content = brandingColors.primary;
        document.head.appendChild(meta);
      }
    }
  }, [brandingColors]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loading/></div>;
  }

  if (error) {
    return <PageNotFound />;
  }

  if (profile && brandingColors) {
    const componentsConfig = [
      {
        type: "ImageWithButtons",
        props: {
          title: "Hi, just letting you know I’m here.",
          description: "I hope you’ll find something valuable here. Feel free to explore and see what I have to offer.",
          links: profile.links.filter((link) => link.hashtags.includes("#favorites")) || [],
          hotspotImage: profile.hotspotImage || "",
          backgroundImage: "https://i.pinimg.com/736x/87/d5/2f/87d52f42221de0c43a6c67c133004fc6.jpg",
          buttonLabel: "Learn More",
          buttonLink: "/learn-more",
          colors: brandingColors, // ✅ Dynamically pass branding colors
        },
      },
      {
        type: "HashtagTabs",
        props: {
          hashtags,
          selectedHashtag,
          setSelectedHashtag,
          colors: brandingColors, // ✅ Dynamically pass branding colors
        },
      },
      {
        type: "LinksList",
        props: { filteredLinks },
      },
      {
        type: "SkillElevationHero",
        props: {
          title: "Develop Your Skills in a New and Unique Way",
          description: "Transform your expertise with our curated courses, designed for interactive and engaging learning experiences.",
          stats: [
            { icon: "📚", label: "50+ Online Courses" },
            { icon: "👥", label: "10k+ Online Students" },
          ],
          imageUrl: "https://i.pinimg.com/736x/c8/62/28/c86228c22a42eec00a9bed2d84642dab.jpg",
          link: { label: "Explore Courses", href: "/courses", style: { borderRadius: "8px" } },
          colors: brandingColors, // ✅ Dynamically pass branding colors
        },
      },
    ];

    return (
      <div style={{ backgroundColor: brandingColors.background }} className="min-h-screen">
        <TemplateRenderer componentsConfig={componentsConfig} />
      </div>
    );
  }

  return null;
};

export default Page;