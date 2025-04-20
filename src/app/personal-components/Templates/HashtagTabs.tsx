import React from "react";

interface HashtagTabsProps {
  hashtags: string[]; // Array of hashtags
  selectedHashtag: string | null; // Currently selected hashtag
  setSelectedHashtag: (hashtag: string) => void; // Function to update the selected hashtag
}

const HashtagTabs: React.FC<HashtagTabsProps> = ({
  hashtags,
  selectedHashtag,
  setSelectedHashtag,
}) => {
  return (
    <div className="bg-white shadow-md py-3 px-5 mb-1 flex flex-wrap justify-center gap-3">
      <button
        onClick={() => setSelectedHashtag("All")}
        className={`px-4 py-2 rounded-full font-semibold transition ${
          selectedHashtag === "All"
            ? "bg-red-700 text-white"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        All
      </button>
      {hashtags.map((hashtag, index) => (
        <button
          key={index}
          onClick={() => setSelectedHashtag(hashtag)}
          className={`px-4 py-2 rounded-full font-semibold transition ${
            selectedHashtag === hashtag
              ? "bg-red-700 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {hashtag}
        </button>
      ))}
    </div>
  );
};

export default HashtagTabs;