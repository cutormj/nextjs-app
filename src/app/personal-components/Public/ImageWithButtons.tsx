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
  title: string; // Title for the section
  description: string; // Description for the section
  links: ILink[]; // Passes links directly as props
  hotspotImage: string; // Background image for the right section
  backgroundImage: string; // Background image for the entire section
  buttonLabel: string; // Label for the action button
  buttonLink: string; // Link for the action button
  colors: {
    primary: string;
    secondary: string;
    background: string; // Background color for the section
    accent: string;
    textPrimary: string;
    textSecondary: string;
  }; // Branding colors
}

const ImageWithButtons: React.FC<ImageWithButtonsProps> = ({
  title,
  description,
  links,
  hotspotImage,
  backgroundImage,
  buttonLabel,
  buttonLink,
  colors,
}) => {
  const DEFAULT_IMAGE = "placeholder-image.jpg"; // Path to your placeholder image

  // Generate a random animation delay for each button
  const getRandomDelay = () => `${Math.random() * 2 + 1}s`; // Random delay between 1s and 3s

  return (
    <section
      className="hero-section relative flex flex-col lg:flex-row items-center text-center lg:text-left py-16 px-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage || DEFAULT_IMAGE})`, // Apply the background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: colors.textPrimary, // Apply text color from branding
      }}
    >
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: colors.primary,
          opacity: 0.9,
        }}
      ></div>

      {/* Left Section: Text and Action Button */}
      <div className="lg:w-1/2 flex flex-col items-center lg:items-start lg:ml-20 px-8 z-10">
        <div className="max-w-2xl">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ color: colors.textPrimary }}
          >
            {title}
          </h1>
          <p
            className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl"
            style={{ color: colors.textSecondary }}
          >
            {description}
          </p>
          <div className="mt-6">
            <a
              href={buttonLink}
              className="px-6 py-2 rounded-lg shadow-md transition text-sm sm:text-base md:text-lg lg:text-xl"
              style={{
                backgroundColor: colors.accent,
                color: colors.secondary,
              }}
            >
              {buttonLabel}
            </a>
          </div>
        </div>
      </div>

      {/* Right Section: Image with Hotspots */}
      <div className="relative lg:w-1/2 w-full flex justify-center items-center h-96 mt-8 lg:mt-0 px-8 z-10">
        {/* Background Image */}
        <div className="relative w-72 h-96">
          <Image
            src={hotspotImage || DEFAULT_IMAGE} // Use default image if hotspotImage is not provided
            alt="Hotspot Background"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-lg shadow-md"
            priority
          />

          {/* Overlay for Buttons */}
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
                    className="w-4 h-4 text-xs rounded-full shadow-md hover:scale-110 transition-transform animate-blink"
                    style={{
                      backgroundColor: colors.accent,
                      color: colors.secondary,
                      animationDelay: getRandomDelay(), // Apply random animation delay
                    }}
                  >
                    +
                  </button>
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="shadow-md rounded-lg p-4 w-64"
                style={{
                  backgroundColor: colors.secondary, // Use background color from brandingColors
                  color: colors.textPrimary, // Use primary text color for the content
                  boxShadow: `0px 4px 15px ${colors.primary}`, // Darker shadow using primary color
                }}
                align="center"
                sideOffset={8}
              >
                {/* Display the image dynamically */}
                <div className="relative w-full h-40 mb-3">
                  <Image
                    src={link.images && link.images[0] ? link.images[0] : DEFAULT_IMAGE}
                    alt={link.shortDescription}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <p className="font-bold text-sm text-center mb-2" style={{ color: colors.textSecondary }}>
                  {link.shortDescription}
                </p>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-3 font-semibold rounded-md px-4 py-2 shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-center"
                  style={{
                    backgroundColor: colors.accent, // Use accent color for the button
                    color: colors.secondary, // Use secondary color for the button text
                  }}
                >
                  🚀 Visit Link
                </a>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageWithButtons;