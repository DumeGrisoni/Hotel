import React from 'react';

import { Menu } from '@/types/menuType';
import Image from 'next/image';

const MenuCard = ({ menu }: { menu: Menu }) => {
  const descriptionsMapped = [] as { index: number; description: string }[];
  for (let i = 0; i < menu.descriptions.length; i++) {
    descriptionsMapped.push({ index: i, description: menu.descriptions[i] });
  }
  const dishesWithDesc = menu.dishes.map((dish, index) => {
    const description = descriptionsMapped.find((desc) => desc.index === index);
    return { dish, description: description };
  });
  return (
    <div className="flex py-10 bg-tertiary my-6 mx-auto max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] min-h-full border border-gray-100 shadow-md shadow-gray-500 flex-col items-center justify-center">
      <div className="relative mb-4 z-0 w-[82px] h-[20px]">
        <Image
          src={'/assets/heading-icon.svg'}
          fill
          alt="icon-logo"
          className="object-cover absolute"
          priority
        />
      </div>
      <div
        key={menu.$id}
        className="flex w-full flex-col items-center justify-center"
      >
        {dishesWithDesc.map((dish, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center px-10 justify-center">
              <p className="text-lg md:text-xl font-bold font-primary mt-2 text-center">
                {dish.dish}
              </p>
              <p className="text-sm md:text-base  text-center my-3">
                {dish.description?.description}
              </p>
            </div>
            <div className="h-px bg-gray-300 w-[50%] my-2" />
          </div>
        ))}
        <p className="text-2xl md:text-3xl text-center font-primary mt-2">
          {menu.price}€
        </p>
      </div>
      <div className="relative mt-4 z-0 w-[82px] h-[20px]">
        <Image
          src={'/assets/heading-icon.svg'}
          fill
          alt="icon-logo"
          className="object-cover absolute"
          priority
        />
      </div>
    </div>
  );
};

export default MenuCard;
