"use client";

import React, { useState, useEffect } from "react";

interface ProfileFormProps {
  initialUsername: string;
  initialBio: string;
  initialHotspotImage: string;
  initialBranding: BrandingColors;
}

interface BrandingColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
}

const defaultBranding = {
  primary: "#1E293B",
  secondary: "#F8FAFC",
  accent: "#EF4444",
  background: "#E2E8F0",
  textPrimary: "#FFFFFF",
  textSecondary: "#64748B",
};

const ProfileForm: React.FC<ProfileFormProps> = () => {
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [hotspotImage, setHotspotImage] = useState<string>("");
  const [branding, setBranding] = useState<BrandingColors>(defaultBranding);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/user/");
        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        setUsername(data.username);
        setBio(data.profile.bio);
        setHotspotImage(data.hotspotImage);
        setBranding(data.branding ?? defaultBranding); // ✅ Ensure branding is fetched correctly
      } catch (error) {
        console.error(error);
        setMessage("Error fetching user data.");
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("/api/user/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, bio, hotspotImage, branding }),
    });

    const data = await response.json();
    if (data.message === "User updated successfully") {
      setMessage("Profile updated successfully!");
      setBranding(data.user.branding); // ✅ Instantly update branding state
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

        <div className="mb-4">
          <label htmlFor="hotspotImage" className="block text-sm font-medium text-gray-700">
            Hotspot Image URL
          </label>
          <input
            type="text"
            id="hotspotImage"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={hotspotImage}
            onChange={(e) => setHotspotImage(e.target.value)}
            required
          />
        </div>

        {/* Branding Colors Fields with Color Picker */}
        <h3 className="mt-6 text-lg font-semibold">Branding Colors</h3>

        {Object.keys(branding).map((key) => (
          <div key={key} className="mb-4 flex items-center space-x-4">
            <label htmlFor={key} className="block text-sm font-medium text-gray-700">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type="color"
              id={key}
              className="h-10 w-10 rounded-md border border-gray-300 cursor-pointer"
              value={branding?.[key as keyof BrandingColors] ?? "#ffffff"}
              onChange={(e) =>
                setBranding({ ...branding, [key]: e.target.value })
              }
              required
            />
            <input
              type="text"
              className="block w-full p-2 border border-gray-300 rounded-md"
              value={branding?.[key as keyof BrandingColors] ?? ""}
              onChange={(e) =>
                setBranding({ ...branding, [key]: e.target.value })
              }
              required
            />
          </div>
        ))}

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