import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import Contact from "./Contact";
import WelcomeHero from "./WelcomeHero";
import ImageWithButtons from "../Public/ImageWithButtons";
import HashtagTabs from "./HashtagTabs"; // Import HashtagTabs
import LinksList from "./LinkList"; // Import LinksList

// Map component types to their respective React components
const componentMap = {
  Hero,
  Features,
  Contact,
  WelcomeHero: WelcomeHero,
  ImageWithButtons,
  HashtagTabs, // Add HashtagTabs to the map
  LinksList, // Add LinksList to the map
};

const TemplateRenderer = ({ componentsConfig }) => {
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

export default TemplateRenderer;