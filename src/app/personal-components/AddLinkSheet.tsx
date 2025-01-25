'use client';

import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Ensure the path is correct
import { Textarea } from '@/components/ui/textarea'; // Ensure the path is correct
// import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface AddLinkSheetProps {
  username: string;
  onLinkAdded: () => void;
}

const AddLinkSheet: React.FC<AddLinkSheetProps> = ({ username, onLinkAdded }) => {
  const [title, setTitle] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [images, setImages] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/links/${username}', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          title,
          url,
          images: images.split(',').map(img => img.trim())
        })
      });

      // Debug response content
      const contentType = response.headers.get('content-type');
      console.log('Response Content Type:', contentType);

      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Response Text:', text);
        throw new Error('Response is not valid JSON');
      }

      const data = await response.json();
      if (data.success) {
        onLinkAdded();
        setTitle('');
        setUrl('');
        setImages('');
        setMessage('Link added successfully!');
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Error: Unable to add link.');
      console.error('Error adding link:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Add New Link</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>
          {/* <VisuallyHidden>Add New Link</VisuallyHidden> */}
        </SheetTitle>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold mb-4">Add New Link</h2>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Link title"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                URL
              </label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Link URL"
                type="url"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                Images (comma-separated URLs)
              </label>
              <Textarea
                id="images"
                value={images}
                onChange={(e) => setImages(e.target.value)}
                placeholder="Image URLs"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              {loading ? 'Adding...' : 'Add Link'}
            </Button>
          </form>
          {message && <p className="mt-4 text-center">{message}</p>}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddLinkSheet;
