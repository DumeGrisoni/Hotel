'use client';
import React, { useActionState, useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// --------------------- Import Internes -----------------------------

import { getOneRoom } from '@/app/actions/roomCrud';
import AdminButton from '@/components/admin/AdminButton';
import { Room } from '@/types/roomsTypes';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/lib/imageUrl';
import { updateRoom } from '@/app/actions/roomCrud';

const RoomUpdate = () => {
  // --------------------- Hooks -----------------------------
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [room, setRoom] = useState<Room>();
  const [data, action, isPending] = useActionState(updateRoom, undefined);

  const [selectedMainImage, setSelectedMainImage] = useState<
    Blob | MediaSource | null
  >(null);
  const [selectedSecondImage, setSelectedSecondImage] = useState<
    Blob | MediaSource | null
  >(null);
  const [selectedThirdImage, setSelectedThirdImage] = useState<
    Blob | MediaSource | null
  >(null);
  const [mainUrl, setMainUrl] = useState<string>('');
  const [secondUrl, setSecondUrl] = useState<string>('');
  const [thirdUrl, setThirdUrl] = useState<string>('');

  // --------------------- Fonctions -----------------------------

  const onUpdate = async () => {
    console.log('update room');
  };

  const handleMainImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      setMainUrl(URL.createObjectURL(file));
      setSelectedMainImage(file);
    }
  };

  const handleSecondImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      setSecondUrl(URL.createObjectURL(file));
      setSelectedSecondImage(file);
    }
  };

  const handleThirdImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      setThirdUrl(URL.createObjectURL(file));
      setSelectedThirdImage(file);
    }
  };

  // --------------------- useEffect -----------------------------

  useEffect(() => {
    const getRoomData = async () => {
      const res = await getOneRoom(id as string);
      setRoom(res);
    };
    getRoomData();
  }, [id]);

  useEffect(() => {
    if (data) {
      if (data.error) {
        toast.error(data.error);
      } else if (data.success) {
        toast.success('Chambre modifiée', { autoClose: 2000 });
        router.push('/profil/admin');
      }
    }
  }, [data, router]);

  // ---------------------- Conditionnal Return -----------------------------

  if (!room) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // --------------------- Variables -----------------------------

  const images = getImageUrl(room);
  const mainImageInput = document.getElementById('mainImage');
  const secondImageInput = document.getElementById('secondImage');
  const thirdImageInput = document.getElementById('thirdImage');

  // --------------------- Return -----------------------------

  return (
    <section className="min-h-screen flex flex-col mt-10 items-center justify-start">
      <form
        action={action}
        className="mb-6 bg-tertiary shadow-md w-[95%] md:w-[80%] lg:w-[70%] xl:w-[50%]"
      >
        <div className="bg-accent py-4 text-center relative mb-2">
          <h3 className="text-[16px] md:text-[20px] lg:text-[24px] text-center bg-accent !text-white">
            Modifier <span>{room.title}</span>
          </h3>
          <div className="absolute -bottom-[8px] left-[calc(50%_-_10px)] w-0 h0 border-l-[10px] border-l-transparent border-t-[8px] border-t-accent border-r-[10px] border-r-transparent " />
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label
              htmlFor="id"
              className=" hidden text-primary font-semibold mb-2"
            >
              ID
            </label>
            <input
              defaultValue={room.$id}
              type="text"
              id="id"
              name="id"
              required
              className="border hidden border-gray-300 bg-white focus:outline-none w-full py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-primary font-semibold mb-2"
            >
              Nom
            </label>
            <input
              defaultValue={room.title}
              type="text"
              id="title"
              name="title"
              required
              className="border border-gray-300 bg-white focus:outline-none w-full py-2 px-3"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-primary font-semibold mb-2"
            >
              Type de chambre
            </label>
            <input
              defaultValue={room.type}
              type="text"
              id="type"
              name="type"
              required
              className="border  border-gray-300 bg-white focus:outline-none w-full py-2 px-3"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="capacity"
              className="block text-primary font-semibold mb-2"
            >
              Capacité
            </label>
            <input
              defaultValue={room.capacity}
              type="number"
              id="capacity"
              name="capacity"
              required
              className="border  border-gray-300 bg-white focus:outline-none w-full py-2 px-3"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="price"
              className="block  text-primary font-semibold mb-2"
            >
              Prix
            </label>
            <input
              defaultValue={room.price}
              type="number"
              id="price"
              name="price"
              required
              className="border  border-gray-300 bg-white focus:outline-none w-full py-2 px-3"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="size"
              className="block text-primary font-semibold mb-2"
            >
              Taille en m²
            </label>
            <input
              defaultValue={room.size}
              type="number"
              id="size"
              name="size"
              required
              className="border  border-gray-300 bg-white focus:outline-none w-full py-2 px-3"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-primary font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              defaultValue={room.description}
              id="description"
              name="description"
              required
              className="border min-h-[150px]  border-gray-300 bg-white focus:outline-none w-full py-2 px-3"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="rating"
              className="block text-primary font-semibold mb-2"
            >
              Note
            </label>
            <input
              type="number"
              defaultValue={room.rating}
              min={0}
              max={5}
              id="rating"
              name="rating"
              required
              className="border  border-gray-300 bg-white focus:outline-none w-full py-2 px-3"
            />
          </div>

          {/* Images */}
          <div className="mb-6">
            <label
              htmlFor="mainImage"
              className="block text-primary font-semibold mb-2"
            >
              <p>Image principale</p>
            </label>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-start">
              {selectedMainImage === null ? (
                <Image src={images[0]} alt="room" width={100} height={80} />
              ) : (
                <Image
                  src={mainUrl}
                  alt="Image sélectionnée"
                  width={100}
                  height={80}
                />
              )}

              <Button
                variant={'outline'}
                onClick={() => (
                  setSelectedMainImage(null),
                  mainImageInput && mainImageInput.click()
                )}
              >
                <input
                  type="file"
                  id="mainImage"
                  name="mainImage"
                  className="focus:outline-none hover:text-white"
                  onChange={handleMainImageChange}
                />
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="secondImage"
              className="block text-primary font-semibold mb-2"
            >
              <p>Seconde Image</p>
            </label>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-start">
              {selectedSecondImage === null ? (
                <Image src={images[1]} alt="room" width={100} height={80} />
              ) : (
                <Image
                  src={secondUrl}
                  alt="Image sélectionnée"
                  width={100}
                  height={80}
                />
              )}

              <Button
                variant={'outline'}
                onClick={() => (
                  setSelectedSecondImage(null),
                  secondImageInput && secondImageInput.click()
                )}
              >
                <input
                  type="file"
                  id="secondImage"
                  name="secondImage"
                  className="focus:outline-none hover:text-white"
                  onChange={handleSecondImageChange}
                />
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="thirdImage"
              className="block text-primary font-semibold mb-2"
            >
              <p>Troisième Image</p>
            </label>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-start">
              {selectedThirdImage === null ? (
                <Image src={images[2]} alt="room" width={100} height={80} />
              ) : (
                <Image
                  src={thirdUrl}
                  alt="Image sélectionnée"
                  width={100}
                  height={80}
                />
              )}

              <Button
                variant={'outline'}
                onClick={() => (
                  setSelectedThirdImage(null),
                  thirdImageInput && thirdImageInput.click()
                )}
              >
                <input
                  type="file"
                  id="thirdImage"
                  name="thirdImage"
                  className="focus:outline-none hover:text-white"
                  onChange={handleThirdImageChange}
                />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex p-2 items-center mb-4 justify-center flex-col md:flex-row gap-3">
          <AdminButton
            disabled={isPending}
            type="update"
            id={id}
            data={room}
            onUpdate={onUpdate}
          />
          <AdminButton type="delete" id={id} data={room} />
        </div>
      </form>
    </section>
  );
};

export default RoomUpdate;
