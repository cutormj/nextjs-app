import React, { useRef } from "react";

interface HashtagTabsProps {
  hashtags: string[]; // Array of hashtags
  selectedHashtag: string | null; // Currently selected hashtag
  setSelectedHashtag: (hashtag: string) => void; // Function to update the selected hashtag
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    textPrimary: string;
    textSecondary: string;
  }; // Branding colors
}

const HashtagTabs: React.FC<HashtagTabsProps> = ({
  hashtags,
  selectedHashtag,
  setSelectedHashtag,
  colors,
}) => {
  const tabbingsRef = useRef<HTMLDivElement>(null); // Reference to the tabbings element

  const handleTabClick = (hashtag: string) => {
    setSelectedHashtag(hashtag);
    tabbingsRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to tabbings
  };

  return (
    <div
      id="tabbings"
      ref={tabbingsRef} // Attach the ref to the tabbings element
      className="shadow-md py-3 px-5 mb-1 flex flex-wrap justify-center gap-3"
      style={{
        backgroundColor: colors.secondary, // Use branding color for background
      }}
    >
      <button
        onClick={() => handleTabClick("All")}
        className="px-4 py-2 rounded-full font-semibold transition"
        style={{
          backgroundColor: selectedHashtag === "All" ? colors.accent : colors.primary,
          color: selectedHashtag === "All" ? colors.secondary : colors.textSecondary,
          opacity: selectedHashtag === "All" ? 1 : 0.7, // Apply opacity for non-selected tabs
        }}
      >
        All
      </button>
      {hashtags.map((hashtag, index) => (
        <button
          key={index}
          onClick={() => handleTabClick(hashtag)}
          className="px-4 py-2 rounded-full font-semibold transition"
          style={{
            backgroundColor: selectedHashtag === hashtag ? colors.accent : colors.primary,
            color: selectedHashtag === hashtag ? colors.secondary : colors.textSecondary,
            opacity: selectedHashtag === hashtag ? 1 : 0.7, // Apply opacity for non-selected tabs
          }}
        >
          {hashtag}
        </button>
      ))}
    </div>
  );
};

export default HashtagTabs;