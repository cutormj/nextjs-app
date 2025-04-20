import React from "react";
import Image from "next/image";

interface WelcomeHeroProps {
  title: string;
  description: string;
  imageUrl: string;
  link: {
    label: string;
    href: string;
    style?: React.CSSProperties;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    textPrimary: string;
    textSecondary: string;
  };
}

const WelcomeHero: React.FC<WelcomeHeroProps> = ({ title, description, imageUrl, link, colors }) => {
  return (
    <section
      className="hero-section relative flex flex-col lg:flex-row items-center text-center lg:text-left py-16 px-8 bg-cover bg-center"
      style={{
        backgroundImage: "url('https://i.pinimg.com/736x/45/03/37/4503371bd9886e3713c21dbd55759355.jpg')", // Replace with your background image URL
        backgroundColor: colors.background, // Fallback background color
        color: colors.textPrimary,
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-yellow-50 opacity-50 z-0"
        style={{
          backgroundColor: colors.background, // Use the background color for the overlay
          opacity: 0.7, // Adjust the opacity to lighten the background
        }}
      ></div>

      {/* Left Section: Text and Buttons */}
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
          {/* Action Link */}
          <div className="mt-6">
            <a
              href={link.href}
              className="px-6 py-2 rounded hover:opacity-90 text-sm sm:text-base md:text-lg lg:text-xl"
              style={{
                backgroundColor: colors.primary,
                color: colors.secondary,
                textDecoration: "none",
                ...link.style,
              }}
            >
              {link.label}
            </a>
          </div>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="lg:w-1/2 flex justify-center mt-12 lg:mt-0 px-8 z-10">
        <Image
          src={imageUrl} // Replace with the actual path to your image
          alt="Illustration of a person learning online"
          width={400} // Adjust width as needed
          height={600} // Adjust height as needed
          className="rounded-md"
        />
      </div>
    </section>
  );
};

export default WelcomeHero;