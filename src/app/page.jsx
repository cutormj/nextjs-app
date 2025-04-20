import React from "react";
import Hero from "./personal-components/Templates/Hero";
import Features from "./personal-components/Templates/Features";
import Contact from "./personal-components/Templates/Contact";
import SkillElevationHero from "./personal-components/Templates/SkillElevationHero";


// Define the color branding
const brandingColors = {
  primary: "#000000", // Black
  secondary: "#FFFFFF", // White
  accent: "#CCCCCC", // Light Gray for accents
  background: "#FFFFFF", // White background
  textPrimary: "#000000", // Black text
  textSecondary: "#666666", // Dark Gray for secondary text
};

const componentsConfig = [
  {
    type: "SkillElevationHero",
    props: {
      title: "Develop Your Skills in a New and Unique Way",
      description:
        "Transform your expertise with our curated courses, designed for interactive and engaging learning experiences.",
      stats: [
        { icon: "📚", label: "50+ Online Courses" },
        { icon: "👥", label: "10k+ Online Students" },
      ],
      imageUrl: "https://i.pinimg.com/736x/c8/62/28/c86228c22a42eec00a9bed2d84642dab.jpg", // Replace with your image URL
      link: {
        label: "Explore Courses",
        href: "/courses", // Replace with the actual URL
        style: { borderRadius: "8px" }, // Optional additional styles
      },
      colors: brandingColors,
    },
  },
  {
    type: "Features",
    props: {
      features: [
        { title: "Feature One", description: "Description of feature one." },
        { title: "Feature Two", description: "Description of feature two." },
        { title: "Feature Three", description: "Description of feature three." },
      ],
      colors: brandingColors,
    },
  },
  // Other components...
];

// Map component types to their respective React components
const componentMap = {
  Hero,
  Features,
  Contact,
  SkillElevationHero
  // Add future components here
};

const Page = () => {
  return (
    <main>
      {componentsConfig.map((component, index) => {
        const Component = componentMap[component.type];
        if (!Component) {
          console.warn(`Component of type "${component.type}" is not registered.`);
          return null;
        }

        // Render the component with its props
        return <Component key={index} {...component.props} />;
      })}
    </main>
  );
};

export default Page;