import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
// import Image from 'next/image';
import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface PublicProfileHeaderProps {
  image: string;
  username: string;
  bio: string;
  backgroundImage: string; // Added backgroundImage prop
}

const PublicProfileHeader: React.FC<PublicProfileHeaderProps> = ({ image, username, bio, backgroundImage }) => {
  
  const { toast } = useToast();
  
  // const handleCopyLink =;

  return (
    <header
      className="relative bg-gray-900 py-8 sm:py-32 flex flex-col items-center"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} // Set background image
    >
      <div className="absolute inset-0 bg-black opacity-80" /> {/* Overlay for better text visibility */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <Avatar className="w-24 h-24 mb-4 mx-auto">
          <AvatarImage src={image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-2xl font-bold text-white sm:text-3xl flex items-center justify-center">
          <Link href={`/${username}`} className="hover:underline mr-2">
            @{username}
          </Link>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={ () => {
    const link = `https://socmed-bio.vercel.app/${username}`;
    navigator.clipboard.writeText(link).then(() => {
      toast({
        description: "Profile link saved to clipboard",
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }} className="bg-transparent hover:bg-transparent p-0 inline-flex items-center">
                  <img className='h-4' alt="copy-link" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC7ElEQVR4nO2ZXYiNQRjHX+tr44h2FfkKuVCUj3VDVlakuFIuFNkbuaHNx2qVZbHrhtIpyo3Slja9N1YpalMsuaF85IqymzYp2UJJS36aPC9P45zXec875+VofjV1mnnmmfOf55mZt5kg8Hg8FQOYDBwBbgMPHZb7wFlgThYi5gMvqSzvgaZKihgFPCAb3gF1lRLSSLbsr5SQvRkL6Xb550cDM+X3oYyFhK5EzAKeGAFVKwQYAzwTh1UtZIdyWNVCzv8vQkIvxB2hj0iETy23hEFafETcEvqIRPjUcksYpMVHxC2hj0iETy23hEFafER+8RW4CxwGtgCrgIYEpRFY8bcjchVYGPwLUJ6QEWC38lEHNAMXgGtAH3AD2FdgvByQF5s+Gd/cA28GxmUp5BuwVd2FtQMfY+wbrPFaY2wHTHpmJeSU2NTKrMfx2b5xB7b9oY+ZqGOuhBSbtSFggth0W21vgHNAi0k7KYuKjLlB2RwEekS0pjmpkIuqc6fUmQEK0Srta61680cmJp7F358xnlq39FOCUgFO2geTmckiQhZIe6+q6zdrpeQBYwBmAMPKd0uSzpush5ec1F+xU0ddsX5S9euUr3pgD9CWoGw3PpWPLuX7ZhIh40VAxAmpnwRcV/WP1IW3Xpg/t0zgFuXRbq2fiOclC5HOx1XnLyZKqm09cFqtj3nWqV6jbB+XKSSvfOj1N5BUSM56LxyR3WRsAdtaERCxVLUtAS7JTlhqyeunN+CA8t2fSIg4WAx8sGZqEDgD7AQ2RjuTvPJGXE48WBHM1m5NaEdQDsAy4FVMCuwSO7NANW2ORPQqn+ZcmZvG4VQ52Ex62Zg38hop96y2O/K9FX39Lo92wAJjTFNfv2skje2n8K40E6MHmy4HY4+cFdFjf5Nqf0E8Q/bTMz/+uH2KF/qqdnI2lSq2XgaNY7XV52iMrRHYmakI68+tlHQ0EXstp/NbsxHow84AzJa0HJYyKBHvSLUmPEG2fAcbZbM/XHYMzgAAAABJRU5ErkJggg==" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className='text-xs p-1'>
                <p>Copy profile link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-sm text-gray-400 pt-3">{bio}</p>
      </div>
    </header>
  );
};

export default PublicProfileHeader;
