import React from "react";

interface HeroProps {
  title: string;
  subtitle: string;
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

const Hero: React.FC<HeroProps> = ({ title, subtitle, link, colors }) => {
  return (
    <section className="hero py-20 text-center" style={{ color: colors.textPrimary }}>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg mb-6">{subtitle}</p>
        <a
          href={link.href}
          className="px-6 py-2 rounded hover:opacity-90"
          style={{ backgroundColor: colors.primary, color: "#fff", textDecoration: "none", ...link.style }}
        >
          {link.label}
        </a>
      </div>
    </section>
  );
};

export default Hero;