'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PublicProfileHeader from "../personal-components/PublicProfileHeader";
import PageNotFound from "../personal-components/PageNotFound";

interface User {
  image?: string;
  username?: string;
}

const Page: React.FC = () => {
  const params = useParams();
  const { id } = params; // Extract id from URL

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user/${id}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data.data); // Ensure it matches the API response structure
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <PageNotFound />;
  }

  const userImage = user.image || '/default-image.png';
  const usernameDisplay = user.username || 'Unknown User';

  return (
    <PublicProfileHeader username={usernameDisplay} image={userImage} />
  );
};

export default Page;
