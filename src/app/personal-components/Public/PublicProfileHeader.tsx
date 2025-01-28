import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import React from 'react';

interface PublicProfileHeaderProps {
  image: string;
  username: string;
  bio: string;
  backgroundImage: string; // Added backgroundImage prop
}

const PublicProfileHeader: React.FC<PublicProfileHeaderProps> = ({ image, username, bio, backgroundImage }) => {
  return (
    <header
      className="relative bg-gray-900 py-8 sm:py-32 flex flex-col items-center"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} // Set background image
    >
      <div className="absolute inset-0 bg-black opacity-90" /> {/* Overlay for better text visibility */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <Avatar className="w-24 h-24 mb-4 mx-auto">
          <AvatarImage src={image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          <Link href={`/${username}`} className="hover:underline">
            @{username}
          </Link>
        </h1>
        <p className="text-sm text-gray-400 pt-3">{bio}</p>
        
      </div>
    </header>
  );
};

export default PublicProfileHeader;
