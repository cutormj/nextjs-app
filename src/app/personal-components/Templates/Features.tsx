import React from "react";

interface Feature {
  title: string;
  description: string;
}

interface FeaturesProps {
  features: Feature[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    textPrimary: string;
    textSecondary: string;
  };
}

const Features: React.FC<FeaturesProps> = ({ features, colors }) => {
  return (
    <section className="features bg-gray-100 py-16" style={{ color: colors.textPrimary }}>
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-item p-6 bg-white shadow rounded">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;