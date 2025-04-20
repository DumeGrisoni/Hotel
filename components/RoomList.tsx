'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Models } from 'node-appwrite';
import { Room } from '@/types/roomsTypes';

const RoomList = ({ rooms }: { rooms: Room[] }) => {
  // --------------------- Variables ----------------------------

  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  // --------------------- Hooks -----------------------------
  const [roomType, setRoomType] = useState('all');
  const [filteredRooms, setFilteredRooms] = useState([] as Room[]);

  // --------------------- Fonctions -----------------------------

  const getStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaStar key={i} />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }
    return stars;
  };

  // --------------------- useEffets -----------------------------

  useEffect(() => {
    const filteredData = rooms?.filter((room: Models.Document) => {
      return roomType === 'all' ? rooms : roomType === room.type;
    });
    setFilteredRooms(filteredData);
  }, [roomType, rooms]);

  // --------------------- Return -----------------------------

  return (
    <section className="py-16 min-h-[90vh]">
      {/* Image&Titre */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative z-0 w-[82px] h-[20px]">
          <Image
            src={'/assets/heading-icon.svg'}
            fill
            alt="icon-logo"
            className="object-cover absolute"
            priority
          />
        </div>
        <h2 className="h2 mb-8 text-center">Nos Chambres</h2>
      </div>

      {/* Tabs */}
      <Tabs
        defaultValue="all"
        className="w-[240px] lg:w-[540px] h-[200px] lg:h-auto mb-8 mx-auto "
      >
        <TabsList className="w-full h-full lg:h-[46px] flex flex-col lg:flex-row">
          <TabsTrigger
            className="w-full h-full cursor-pointer"
            value="all"
            onClick={() => setRoomType('all')}
          >
            Toutes
          </TabsTrigger>
          <TabsTrigger
            className="w-full h-full cursor-pointer "
            value="simple"
            onClick={() => setRoomType('single')}
          >
            Simple
          </TabsTrigger>
          <TabsTrigger
            className="w-full h-full cursor-pointer"
            value="double"
            onClick={() => setRoomType('double')}
          >
            Double
          </TabsTrigger>
          <TabsTrigger
            className="w-full h-full cursor-pointer"
            value="quadruple "
            onClick={() => setRoomType('quadruple')}
          >
            Familiale
          </TabsTrigger>
          <TabsTrigger
            className="w-full h-full cursor-pointer"
            value="suite"
            onClick={() => setRoomType('suite')}
          >
            Suites
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Liste des chambres  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRooms.map((room: Models.Document) => {
          const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room.mainImage}/view?project=${projectId}`;
          return (
            <div key={room.$id} className="w-[90%] mx-auto ">
              <Link
                href={`/room/${room.$id}`}
                className="relative w-full h-[300px] overflow-hidden mb-6 shadow-sm"
              >
                <div className="relative w-full h-[300px] overflow-hidden mb-6 shadow-sm">
                  <Image
                    src={imageUrl}
                    fill
                    priority
                    alt={room.title}
                    className="object-cover "
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </Link>
              <div className="h-[134px]">
                <div className="flex items-center justify-between mb-6">
                  <div>Capacité - {room.capacity} personnes</div>
                  <div className="flex gap-1 text-accent ">
                    {getStars(room.rating)}
                  </div>
                </div>
                <Link href={`/room/${room.id}`}>
                  <h3 className="h3">{room.title}</h3>
                </Link>
                <p className="h3 font-secondary font-medium text-accent mb-4">
                  {room.price}€
                  <span className="text-base text-secondary"> / nuit</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RoomList;
