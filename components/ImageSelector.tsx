'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { getImageUrl } from '@/lib/imageUrl';
import { Room } from '@/types/roomsTypes';

const ImageSelector = ({ room }: { room: Room }) => {
  const images = getImageUrl(room);

  // --------------------- Hooks -----------------------------

  const [selectedImg, setSelectedImg] = useState(images[0]);

  // --------------------- Functions -----------------------------

  const setImage = (url: string) => {
    setSelectedImg(url);
  };

  // --------------------- Return -----------------------------

  return (
    <div>
      <div className="w-[90%] mx-auto h-auto flex items-center justify-center mb-4">
        {room && images && (
          <Image
            src={selectedImg ? selectedImg : images[0]}
            alt="room"
            width={1000}
            height={540}
            className="object-cover h-full w-full max-h-[316px] md:max-w-[1000px] md:max-h-[329px] lg:max-h-[400px] xl:max-h-[450px]"
          />
        )}
      </div>
      <div className="flex items-center w-full md:w-[50vw] mx-auto px-2 ">
        {room &&
          images.map((image: string) => {
            return (
              <div
                key={image}
                onClick={() => setImage(image)}
                className={` cursor-pointer py-1`}
              >
                <Image
                  src={image}
                  alt="room"
                  priority
                  width={1000}
                  height={600}
                  className={`${
                    selectedImg === image && 'border border-grey rounded-lg'
                  } py-1 object-cover md:w-[60vw] max-h-[60px] md:max-h-[70px] lg:max-h-[100px] h-full px-1`}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ImageSelector;
