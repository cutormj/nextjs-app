'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ILink {
  _id: string;
  url: string;
  shortDescription: string;
  description: string;
  images?: string[];
  groupId?: string;
}

const LinkPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [imageLinks, setImageLinks] = useState<string[]>([]);
  const [groupId, setGroupId] = useState('');
  const [editMode, setEditMode] = useState(false); // State to track editing
  const [currentLinkId, setCurrentLinkId] = useState<string | null>(null); // Track the link being edited

  const [message, setMessage] = useState('');
  const [links, setLinks] = useState<ILink[]>([]);

  const router = useRouter(); // For navigating back

  const fetchLinks = async () => {
    const response = await fetch('/api/user/links', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setLinks(data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('/api/user/links', {
      method: editMode ? 'PUT' : 'POST', // Use PUT for edit, POST for add
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, shortDescription, description, images: imageLinks, groupId, _id: currentLinkId }),
    });

    const data = await response.json();
    if (data.message === (editMode ? 'Link updated successfully' : 'Link added successfully')) {
      setMessage(editMode ? 'Link updated successfully!' : 'Link added successfully!');
      setUrl('');
      setShortDescription('');
      setDescription('');
      setImageLinks([]);
      setGroupId('');
      setEditMode(false);
      setCurrentLinkId(null);
      fetchLinks(); // Refresh links after adding or updating
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  const handleEdit = (link: ILink) => {
    setEditMode(true);
    setCurrentLinkId(link._id);
    setUrl(link.url);
    setShortDescription(link.shortDescription);
    setDescription(link.description);
    setImageLinks(link.images || []);
    setGroupId(link.groupId || '');
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setCurrentLinkId(null);
    setUrl('');
    setShortDescription('');
    setDescription('');
    setImageLinks([]);
    setGroupId('');
    setMessage(''); // Clear any messages
  };

  const handleDelete = async (linkId: string) => {
    const response = await fetch('/api/user/links', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ linkId }),
    });

    const data = await response.json();
    if (data.message === 'Link deleted successfully') {
      setMessage('Link deleted successfully!');
      fetchLinks(); // Refresh links after deleting a link
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  const handleImageLinksChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const linksArray = event.target.value.split(',').map((link) => link.trim());
    setImageLinks(linksArray);
  };

  return (
    <div className="container mx-auto p-8">
      {/* Back Button */}
      <button
        onClick={() => router.push('/protected/dashboard')}
        className="mb-4 py-2 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-800"
      >
        Back to Dashboard
      </button>

      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Form Section */}
        <div className="max-w-md mx-auto lg:w-1/2 bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                URL
              </label>
              <input
                type="url"
                id="url"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
                Short Description
              </label>
              <input
                type="text"
                id="shortDescription"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="imageLinks" className="block text-sm font-medium text-gray-700">
                Image Links (comma-separated)
              </label>
              <textarea
                id="imageLinks"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                rows={3}
                value={imageLinks.join(', ')}
                onChange={handleImageLinksChange}
              />
              {/* Display Image Links Below */}
              <div className="mt-2 grid grid-cols-2 gap-2"> {/* Add grid layout for better structure */}
                {imageLinks.map((link, index) => (
                  <div key={index} className="relative w-full h-32"> {/* Define width and height for the images */}
                    <Image
                      src={link} // Use the link as the image source
                      alt={`Image ${index + 1}`} // Add an alt tag for accessibility
                      layout="fill" // Make the image fill the container
                      objectFit="cover" // Ensure the image covers the space appropriately
                      className="rounded-md border border-gray-300" // Styling for images
                    />
                  </div>
                ))}
              </div>

            </div>
            <div className="mb-4">
              <label htmlFor="groupId" className="block text-sm font-medium text-gray-700">
                Group ID (optional)
              </label>
              <input
                type="text"
                id="groupId"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editMode ? 'Update Link' : 'Add Link'}
              </button>
              {editMode && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="ml-2 py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Add New Link
                </button>
              )}
            </div>
          </form>
          {message && <p className="mt-4 text-center">{message}</p>}
        </div>

        {/* Links Section */}
        <div className="mt-8 lg:mt-0 lg:w-1/2">
          <h2 className="text-xl font-bold mb-2">Your Links</h2>
          <ul className="flex flex-col space-y-4">
            {links.map((link) => (
              <li key={link._id} className="flex justify-between items-center">
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {link.shortDescription}
                </a>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(link)}
                    className="py-1 px-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(link._id)}
                    className="py-1 px-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LinkPage;