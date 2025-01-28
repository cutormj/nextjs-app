'use client';

import * as React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface CarouselSpacingProps {
  images: string[];
}

export function PublicUserLinkImages({ images }: CarouselSpacingProps) {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent className="-ml-1 flex justify-center items-center">
        {images.map((image, index) => (
          <CarouselItem key={index} className="pl-1 basis-1/2 lg:basis-1/1 px-2  transition-transform duration-300">
            <div className="p-1 flex justify-center items-center bg-gray-100 rounded-lg shadow-md">
              <Avatar className="w-24 h-24">
                <AvatarImage src={image} />
                <AvatarFallback>IMG</AvatarFallback>
              </Avatar>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
