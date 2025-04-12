'use client';

import React from 'react';
import Image from 'next/image';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

interface ILink {
  _id: string;
  url: string;
  shortDescription: string;
  description?: string;
  top: string;
  left: string;
  images?: string[];
}

interface ImageWithButtonsProps {
  // username: string; // Accepts username dynamically as a prop
  links: ILink[]; // Passes links directly as props
  hotspotImage: string;
}

const ImageWithButtons: React.FC<ImageWithButtonsProps> = ({ links, hotspotImage }) => {
  const DEFAULT_IMAGE = "placeholder-image.jpg"; // Path to your placeholder image

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <Image
        src={hotspotImage} // Replace with your image path
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
      />

      {/* Map provided links into popover buttons */}
      {links.map((link) => (
        <Popover key={link._id}>
          <PopoverTrigger asChild>
            <div
              className="absolute flex flex-col items-center text-center group"
              style={{
                top: link.top, // Dynamically set from the props
                left: link.left, // Dynamically set from the props
              }}
            >
              {/* Button */}
              <button
                className="w-8 h-8 bg-red-700 text-white text-1xl  rounded-full shadow-md hover:bg-red-600 focus:outline-none group-hover:scale-105 transition-transform"
              >
                +
              </button>
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="bg-red-700 text-white shadow-xl rounded-lg p-4 "
            align="center"
            sideOffset={8}
          >
            {/* Display the image dynamically */}
            <div className="relative w-40 h-40 mb-3">
              <Image
                src={link.images && link.images[0] ? link.images[0] : DEFAULT_IMAGE}
                alt={link.shortDescription}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <p className="font-bold text-xs text-center mb-2">{link.shortDescription}</p>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 text-red-950 bg-white hover:text-white hover:bg-red-950 font-semibold rounded-md px-4 py-2 shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-center"
            >
              🚀 Buy on TikTok
            </a>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
};

export default ImageWithButtons;