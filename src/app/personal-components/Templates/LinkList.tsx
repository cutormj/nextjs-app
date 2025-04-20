import React from "react";
import Image from "next/image";

interface Link {
  _id: string;
  url: string;
  shortDescription: string;
  images: string[];
  hashtags: string[];
}

interface LinksListProps {
  filteredLinks: Link[]; // Array of filtered links
}

const LinksList: React.FC<LinksListProps> = ({ filteredLinks }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      {filteredLinks.length > 0 ? (
        <ul className="flex flex-col space-y-4">
          {filteredLinks.map((link) => (
            <li
              key={link._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center">
                {/* Link Short Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {link.shortDescription}
                  </h3>
                  {/* Link URL */}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                  >
                    {link.url}
                  </a>
                </div>
                {/* Image Preview (Optional) */}
                {link.images && link.images.length > 0 && (
                  <div className="relative w-16 h-16">
                    <Image
                      src={link.images[0]}
                      alt={link.shortDescription}
                      className="rounded-lg object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
              </div>
              {/* Hashtags */}
              {link.hashtags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {link.hashtags.map((hashtag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs"
                    >
                      {hashtag}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-sm">No links available.</p>
      )}
    </div>
  );
};

export default LinksList;