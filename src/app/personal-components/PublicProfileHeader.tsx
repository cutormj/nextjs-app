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
}

const PublicProfileHeader: React.FC<PublicProfileHeaderProps> = ({ image, username }) => {
  return (
    <header className="relative bg-gray-900 py-24 sm:py-32 flex flex-col items-center">
      <div className="absolute inset-0">
        <div
          aria-hidden="true"
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:block sm:transform-gpu sm:blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute -top-52 left-1/2 transform-gpu blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          />
        </div>
      </div>
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
        <dl className="mt-6 flex flex-wrap justify-center">
          {stats.map((stat) => (
            <div key={stat.name} className="w-1/4 sm:w-1/4 px-2 sm:px-5 text-center">
              <dt className="text-sm text-gray-300">{stat.name}</dt>
              <dd className="text-2xl md:text-3xl lg:text-4xl  font-extrabold text-white">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
};

export default PublicProfileHeader;
