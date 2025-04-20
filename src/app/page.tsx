'use client';

import React from "react";
import TemplateRenderer from "./personal-components/Templates/0TemplateRenderer";

const Page: React.FC = () => {
  const brandingColors = {
    primary: "#000000", // Black (contrasts well with white)
    secondary: "#FFFFFF", // White (light background or card color)
    accent: "#EF4444", // Vibrant Red (for call-to-action elements)
    background: "#F8FAFC", // Light Gray (subtle page background)
    textPrimary: "#1F2937", // Dark Gray (for headings or main text)
    textSecondary: "#4B5563", // Medium Gray (for subtitles or less prominent text)
  };

  const componentsConfig = [
    {
      type: "WelcomeHero",
      props: {
        title: "Welcome to the Ultimate Platform for Awesomeness!",
        description: "Oh wow, you're here! This is the place where all the cool features and cutting-edge tech come together. Dive in, explore, and let us blow your mind with what we've built. Click below to start your epic journey!",
        imageUrl: "https://i.pinimg.com/736x/cc/c5/ae/ccc5ae1377c3e3a63ceb92ca6cf909ea.jpg", // Replace with your image URL
        link: {
          label: "Try it out!",
          href: "/get-started",
          style: { borderRadius: "8px" },
        },
        colors: brandingColors,
      },
    },
    {
      type: "Features",
      props: {
        features: [
          {
            title: "Dynamic Components",
            description: "Easily render dynamic components using a flexible configuration system.",
          },
          {
            title: "Customizable Branding",
            description: "Apply your own branding colors to match your project's theme.",
          },
          {
            title: "Responsive Design",
            description: "Enjoy a fully responsive layout that works seamlessly on all devices.",
          },
          {
            title: "Interactive Hotspots",
            description: "Add interactive elements to your images for an engaging user experience.",
          },
          {
            title: "Hashtag Filtering",
            description: "Filter and organize content using hashtags for better navigation.",
          },
          {
            title: "Next.js Integration",
            description: "Built with Next.js for fast performance and modern web standards.",
          },
        ],
        colors: brandingColors,
      },
    },
  ];

  return (
    <div>
      <TemplateRenderer componentsConfig={componentsConfig} />
    </div>
  );
};

export default Page;