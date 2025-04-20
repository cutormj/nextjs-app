import React from "react";
import Image from "next/image";

interface SkillElevationHeroProps {
  title: string;
  description: string;
  stats: { icon: string; label: string }[];
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

const SkillElevationHero: React.FC<SkillElevationHeroProps> = ({ title, description, stats, imageUrl, link, colors }) => {
  return (
    <section
      className="hero-section flex flex-col lg:flex-row items-center text-center lg:text-left py-16 px-8 bg-cover bg-center"
      style={{
        backgroundImage: "url('https://i.pinimg.com/736x/98/b8/e3/98b8e37e267aa0b065811af6f507b3ed.jpg')", // Replace with your background image URL
        backgroundColor: colors.background, // Fallback background color
        color: colors.textPrimary,
      }}
    >
      {/* Left Section: Text and Buttons */}
      <div className="lg:w-1/2 flex flex-col items-center lg:items-start lg:ml-20 px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold" style={{ color: colors.textPrimary }}>
            {title}
          </h1>
          <p className="mt-4 text-lg" style={{ color: colors.textSecondary }}>
            {description}
          </p>
          <div className="mt-8 flex justify-center lg:justify-start gap-8" style={{ color: colors.textSecondary }}>
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-xl">{stat.icon}</span>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          {/* Action Link */}
          <div className="mt-6">
            <a
              href={link.href}
              className="px-6 py-2 rounded hover:opacity-90"
              style={{ backgroundColor: colors.primary, color: colors.secondary, textDecoration: "none", ...link.style }}
            >
              {link.label}
            </a>
          </div>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="lg:w-1/2 flex justify-center mt-12 lg:mt-0 px-8">
        <Image
          src={imageUrl} // Replace with the actual path to your image
          alt="Illustration of a person learning online"
          width={600} // Adjust width as needed
          height={600} // Adjust height as needed
          className="rounded-md"
        />
      </div>
    </section>
  );
};

export default SkillElevationHero;