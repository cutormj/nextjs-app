import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  username: string;
  bio: string;
}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <div>
      {/* Bottom Navbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white">
        <nav className="flex justify-around py-4">
          <Link href="/">
            <div className="flex flex-col items-center cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l9-9m0 0l9 9m-9-9v18" />
              </svg>
              <span className="text-xs">Home</span>
            </div>
          </Link>

          <Link href="/notifications">
            <div className="flex flex-col items-center cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m3-3v6" />
              </svg>
              <span className="text-xs">Notifications</span>
            </div>
          </Link>

          <Link href="/protected/dashboard/links">
            <div className="flex flex-col items-center cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-xs">Links</span>
            </div>
          </Link>

          <Link href="/profile">
            <div className="flex flex-col items-center cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-xs">Profile</span>
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;