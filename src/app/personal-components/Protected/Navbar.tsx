"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Import shadcn dialog components
import ProfileForm from "@/app/personal-components/Protected/ProfileForm";

interface NavbarProps {
  username: string;
  bio: string;
  hotspotImage: string;
}

const Navbar: React.FC<NavbarProps> = ({ username, bio, hotspotImage }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // Track the dialog state
  const [branding, setBranding] = useState(null); // Store branding colors

  useEffect(() => {
    // Fetch branding colors when opening the profile dialog
    const fetchBranding = async () => {
      try {
        const response = await fetch("/api/user/");
        if (!response.ok) throw new Error("Failed to fetch branding");

        const data = await response.json();
        setBranding(data.branding);
      } catch (error) {
        console.error("Error fetching branding:", error);
      }
    };

    if (isDialogOpen) {
      fetchBranding();
    }
  }, [isDialogOpen]);

  return (
    <div>
      {/* Bottom Navbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white">
        <nav className="flex justify-around py-4">
          <Link href="/">
            <div className="flex flex-col items-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l9-9m0 0l9 9m-9-9v18"
                />
              </svg>
              <span className="text-xs">Home</span>
            </div>
          </Link>

          <Link href="/notifications">
            <div className="flex flex-col items-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12H9m3-3v6"
                />
              </svg>
              <span className="text-xs">Notifications</span>
            </div>
          </Link>

          <Link href="/protected/dashboard/links">
            <div className="flex flex-col items-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="text-xs">Links</span>
            </div>
          </Link>

          {/* Profile option triggers the dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setIsDialogOpen(true)} // Open the dialog
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="text-xs">Profile</span>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>Update your username, bio, and branding colors.</DialogDescription>
              {/* Render ProfileForm inside the dialog with branding */}
              {branding && (
                <ProfileForm
                  initialUsername={username}
                  initialBio={bio}
                  initialHotspotImage={hotspotImage}
                  initialBranding={branding} // ✅ Pass branding colors
                />
              )}
            </DialogContent>
          </Dialog>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;