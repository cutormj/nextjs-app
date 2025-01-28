import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ProfileForm from '@/app/personal-components/Protected/ProfileForm';
import LinkPage from './LinkPage';

interface NavbarProps {
  username: string;
  bio: string;
}

const Navbar: React.FC<NavbarProps> = ({ username, bio }) => {
  return (
    <div>
      {/* Bottom Navbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white lg:hidden">
        <nav className="flex justify-around py-4">
          <a href="#" className="flex flex-col items-center ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l9-9m0 0l9 9m-9-9v18" />
            </svg>
            <span className="text-xs">Home</span>
          </a>
          
          <a href="#" className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m3-3v6" />
            </svg>
            <span className="text-xs">Notifications</span>
          </a>
          {/* <a href="#" className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-3-3v6" />
            </svg>
            <span className="text-xs">Links</span>
          </a> */}
          <Sheet>
            <SheetTrigger asChild>
              <a href="#" className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-xs">Links</span>
              </a>
            </SheetTrigger>
            <SheetContent side="bottom" >
              <SheetHeader>
                <SheetTitle>Links</SheetTitle>
                <SheetDescription>Add Link.</SheetDescription>
              </SheetHeader>
              <LinkPage  />
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <a href="#" className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-xs">Profile</span>
              </a>
            </SheetTrigger>
            <SheetContent side="bottom" >
              <SheetHeader>
                <SheetTitle>Edit Profile</SheetTitle>
                <SheetDescription>Update your profile information.</SheetDescription>
              </SheetHeader>
              <ProfileForm initialUsername={username} initialBio={bio} />
            </SheetContent>
          </Sheet>

        </nav>
      </div>

      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-gray-800 lg:text-white lg:fixed lg:top-0 lg:bottom-0">
        <nav className="flex flex-col items-center py-4 space-y-6">
          <a href="#" className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l9-9m0 0l9 9m-9-9v18" />
            </svg>
            <span className="text-sm">Home</span>
          </a>
          <a href="#" className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm">Profile</span>
          </a>
          <a href="#" className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m3-3v6" />
            </svg>
            <span className="text-sm">Notifications</span>
          </a>
          <a href="#" className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-3-3v6" />
            </svg>
            <span className="text-sm">Messages</span>
          </a>
          <Sheet>
            <SheetTrigger asChild>
              <a href="#" className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-sm">Settings</span>
              </a>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit Profile</SheetTitle>
                <SheetDescription>Update your profile information.</SheetDescription>
              </SheetHeader>
              <ProfileForm initialUsername={username} initialBio={bio} />
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
