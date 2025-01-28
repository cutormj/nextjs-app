'use client';

import React, { useState, useEffect } from 'react';

interface ProfileFormProps {
  initialUsername: string;
  initialBio: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initialUsername, initialBio }) => {
  const [username, setUsername] = useState<string>(initialUsername);
  const [bio, setBio] = useState<string>(initialBio);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    setUsername(initialUsername);
    setBio(initialBio);
  }, [initialUsername, initialBio]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('/api/user/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, bio }),
    });

    const data = await response.json();
    if (data.message === 'User updated successfully') {
      setMessage('Profile updated successfully!');
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default ProfileForm;
