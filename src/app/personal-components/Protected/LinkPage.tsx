'use client';

import React, { useState, useEffect } from 'react';

interface ILink {
  _id: string;
  url: string;
  shortDescription: string;
  images?: string[];
  groupId?: string;
}

const LinkPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageLinks, setImageLinks] = useState<string[]>([]);
  const [groupId, setGroupId] = useState('');

  const [message, setMessage] = useState('');
  const [links, setLinks] = useState<ILink[]>([]);

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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, shortDescription: description, images: imageLinks, groupId }),
    });

    const data = await response.json();
    if (data.message === 'Link added successfully') {
      setMessage('Link added successfully!');
      setUrl('');
      setDescription('');
      setImageLinks([]);
      setGroupId('');
      fetchLinks(); // Refresh links after adding a new link
    } else {
      setMessage(`Error: ${data.error}`);
    }
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

  return (
    <div className="container mx-auto p-8">
      {/* <h1 className="text-2xl font-bold mb-4">Add New Link</h1> */}
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
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
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              id="description"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageLinks" className="block text-sm font-medium text-gray-700">
              Image Links (comma separated)
            </label>
            <input
              type="text"
              id="imageLinks"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={imageLinks.join(', ')}
              onChange={(e) => setImageLinks(e.target.value.split(',').map(link => link.trim()))}
            />
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
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Link
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Your Links</h2>
        <ul>
          {links.map((link) => (
            <li key={link._id} className="mb-2 flex justify-between items-center">
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {link.shortDescription}
              </a>
              <button
                onClick={() => handleDelete(link._id)}
                className="ml-4 py-1 px-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LinkPage;
