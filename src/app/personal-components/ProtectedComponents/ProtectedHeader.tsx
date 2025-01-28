import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { doLogout } from '@/actions';
import ProfileForm from '../ProfileForm';

const stats = [
  { name: 'Affiliates', value: '12' },
  { name: 'Links', value: '300+' },
  { name: 'Followers', value: '40' },
  { name: 'Paid', value: '7k+' },
];

interface ProtectedHeaderProps {
  image: string;
  name: string;
  email: string;
  username: string;
  bio?: string;
  location?: string;
  website?: string;
}

const ProtectedHeader: React.FC<ProtectedHeaderProps> = ({ image, username, bio }) => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32 flex flex-col items-center">
      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center">
        <div className="mx-auto max-w-1xl lg:mx-0 flex flex-col items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src={image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="mt-4 text-lg font-medium text-gray-300 sm:text-xl/8">
            {username}
          </p>
          <p className="text-sm text-gray-400">{bio}</p>
          {/* <p className="text-sm text-gray-400">{email}</p> */}
        </div>
        <div className="mx-auto mt-5 max-w-2xl lg:mx-0 lg:max-w-none flex flex-col items-center">
          {/* <dl className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {bio && (
              <div className="flex flex-col-reverse gap-1 items-center">
                <dt className="text-xs sm:text-base md:text-lg lg:text-xl text-gray-300">Bio</dt>
                <dd className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">{bio}</dd>
              </div>
            )}
          </dl> */}
          <dl className="grid grid-cols-4 gap-8 sm:grid-cols-4 lg:grid-cols-4 mt-8">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse gap-1 items-center">
                <dt className="text-xs sm:text-base md:text-lg lg:text-xl text-gray-300">{stat.name}</dt>
                <dd className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
          <div className="grid mt-10 grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10 justify-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className='bg-gray-600'>Edit Profile</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit Profile</SheetTitle>
                  <SheetDescription>
                    Update your profile information.
                  </SheetDescription>
                </SheetHeader>
                <ProfileForm username={username} />
              </SheetContent>
            </Sheet>
            <Button onClick={doLogout} variant="destructive">Logout</Button>
          </div>
        </div>
      </div>
      {/* <Profile /> */}
    </div>
  );
};

export default ProtectedHeader;
