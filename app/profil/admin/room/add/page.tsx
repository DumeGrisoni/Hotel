'use client';
import { Button } from '@/components/ui/button';
import React, { useEffect, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// ---------------------Import Internes -----------------------------
import { createRoom } from '@/app/actions/roomCrud';

const AddRoom = () => {
  // --------------------- Hooks -----------------------------

  const router = useRouter();
  const [data, action, isPending] = useActionState(createRoom, undefined);

  // --------------------- useEffect -----------------------------

  useEffect(() => {
    if (data) {
      if (data.error) {
        toast.error(data.error);
      } else if (data.success) {
        toast.success('Chambre ajoutée', { autoClose: 2000 });
        router.push('/profil/admin');
      }
    }
  }, [data, router]);

  return (
    <div className="min-h-screen flex flex-col mt-10 items-center justify-start">
      <form
        action={action}
        className="mb-6 bg-tertiary shadow-md w-[95%] md:w-[80%] lg:w-[70%] xl:w-[50%]"
      >
        <div className="bg-accent py-4 text-center relative mb-2">
          <h3 className="text-[16px] md:text-[20px] lg:text-[24px] text-center bg-accent !text-white">
            Ajouter une chambre
          </h3>
          <div className="absolute -bottom-[8px] left-[calc(50%_-_10px)] w-0 h0 border-l-[10px] border-l-transparent border-t-[8px] border-t-accent border-r-[10px] border-r-transparent " />
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-primary font-semibold mb-2"
            >
              Nom
            </label>
            <input
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
              defaultValue={0}
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

            <Button variant={'outline'}>
              <input
                type="file"
                required
                id="mainImage"
                name="mainImage"
                className="focus:outline-none hover:text-white"
              />
            </Button>
          </div>

          <div className="mb-6">
            <label
              htmlFor="secondImage"
              className="block text-primary font-semibold mb-2"
            >
              <p>Seconde Image</p>
            </label>

            <Button variant={'outline'}>
              <input
                type="file"
                id="secondImage"
                required
                name="secondImage"
                className="focus:outline-none hover:text-white"
              />
            </Button>
          </div>

          <div className="mb-6">
            <label
              htmlFor="thirdImage"
              className="block text-primary font-semibold mb-2"
            >
              <p>Troisième Image</p>
            </label>

            <Button variant={'outline'}>
              <input
                type="file"
                required
                id="thirdImage"
                name="thirdImage"
                className="focus:outline-none hover:text-white"
              />
            </Button>
          </div>

          <div className="flex flex-col gap-5">
            <Button
              disabled={isPending}
              type="submit"
              variant={'outline'}
              className="h-10 w-full md:w-[50%] mx-auto mt-2 text-secondray hover:text-white text-lg"
            >
              Ajouter la chambre
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRoom;
