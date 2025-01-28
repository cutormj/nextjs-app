import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import React from 'react';

const stats = [
  { name: 'Affiliates', value: '12' },
  { name: 'Links', value: '300+' },
  { name: 'Followers', value: '40' },
  { name: 'Paid', value: '7k+' },
];

interface PublicProfileHeaderProps {
  image: string;
  username: string;
  bio: string;
  backgroundImage: string; // Added backgroundImage prop
}

const PublicProfileHeader: React.FC<PublicProfileHeaderProps> = ({ image, username, bio, backgroundImage }) => {
  return (
    <header
      className="relative bg-gray-900 py-24 sm:py-32 flex flex-col items-center"
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
        <dl className="mt-6 flex flex-wrap justify-center">
          {stats.map((stat) => (
            <div key={stat.name} className="w-1/4 sm:w-1/4 px-2 sm:px-5 text-center">
              <dt className="text-sm text-gray-300">{stat.name}</dt>
              <dd className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
};

export default PublicProfileHeader;
