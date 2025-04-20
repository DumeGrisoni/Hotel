'use client';
import React, { useActionState, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// --------------------- Import Internes -----------------------------

import { getOneMenu, updateMenu } from '@/app/actions/menuCrud';
import AdminButton from '@/components/admin/AdminButton';
import { Menu } from '@/types/menuType';

const MenuUpdate = () => {
  // --------------------- Hooks -----------------------------
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [menu, setMenu] = useState<Menu>();
  const [data, action, isPending] = useActionState(updateMenu, undefined);

  // --------------------- Fonctions -----------------------------

  // --------------------- useEffect -----------------------------

  useEffect(() => {
    const getMenuData = async () => {
      const res = await getOneMenu(id as string);
      setMenu(res);
    };
    getMenuData();
  }, [id]);

  useEffect(() => {
    if (data) {
      if (data.error) {
        toast.error(data.error);
      } else if (data.success) {
        toast.success('Menu modifiée', { autoClose: 2000 });
        router.push('/profil/admin');
      }
    }
  }, [data, router]);

  // ---------------------- Conditionnal Return -----------------------------

  if (!menu) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col mt-10 items-center justify-start">
      <form
        action={action}
        className="mb-6 bg-tertiary shadow-md w-[95%] md:w-[80%] lg:w-[70%] xl:w-[50%]"
      >
        <div className="bg-accent py-4 text-center relative mb-2">
          <h3 className="text-[16px] md:text-[20px] lg:text-[24px] text-center bg-accent !text-white">
            Modifier {menu.title}
          </h3>
          <div className="absolute -bottom-[8px] left-[calc(50%_-_10px)] w-0 h0 border-l-[10px] border-l-transparent border-t-[8px] border-t-accent border-r-[10px] border-r-transparent " />
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-primary font-semibold mb-2"
            >
              Titre du menu
            </label>
            <input
              defaultValue={menu.title}
              type="text"
              id="title"
              name="title"
              required
              className="border border-gray-300 bg-white focus:outline-none w-full py-2 px-3"
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
              defaultValue={menu.price}
              type="number"
              id="price"
              name="price"
              required
              className="border  border-gray-300 bg-white focus:outline-none w-full py-2 px-3"
            />
          </div>

          <input
            defaultValue={menu.$id}
            type="text"
            id="id"
            name="id"
            required
            className="border my-1 hidden border-gray-300 bg-white focus:outline-none w-full py-2 px-3"
          />

          <div className="mb-6">
            <label
              htmlFor="dishes"
              className="block text-primary font-semibold mb-2"
            >
              Plats
            </label>
            {menu.dishes.map((dish, index) => (
              <input
                key={index}
                defaultValue={dish}
                type="text"
                id="dishes"
                name="dishes"
                required
                className="border my-1  border-gray-300 bg-white focus:outline-none w-full py-2 px-3"
              />
            ))}
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-primary font-semibold mb-2"
            >
              Descriptions
            </label>
            {menu.descriptions.map((description, index) => (
              <textarea
                key={index}
                defaultValue={description}
                id="description"
                name="description"
                required
                className="border my-1 min-h-[150px] border-gray-300 bg-white focus:outline-none w-full py-2 px-3"
              />
            ))}
          </div>

          <div className="flex flex-col items-center gap-5">
            <AdminButton
              disabled={isPending}
              id={id}
              data={menu}
              type="update"
            />
            <AdminButton
              disabled={isPending}
              id={id}
              data={menu}
              type="delete"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default MenuUpdate;
