'use client';
import React, { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// --------------------- Import Internes -----------------------------

import { createMenu } from '@/app/actions/menuCrud';
import { Button } from '@/components/ui/button';

const AddMenu = () => {
  // --------------------- Hooks -----------------------------
  const router = useRouter();
  const [data, action, isPending] = useActionState(createMenu, undefined);

  // --------------------- Fonctions -----------------------------

  // --------------------- useEffect -----------------------------

  useEffect(() => {
    if (data) {
      if (data.error) {
        toast.error(data.error);
      } else if (data.success) {
        toast.success('Menu créer', { autoClose: 2000 });
        // router.push('/profil/admin');
      }
    }
  }, [data, router]);

  // --------------------- Render -----------------------------

  return (
    <div className="min-h-screen flex flex-col mt-10 items-center justify-start">
      <form
        action={action}
        className="mb-6 bg-tertiary shadow-md w-[95%] md:w-[80%] lg:w-[70%] xl:w-[50%]"
      >
        <div className="bg-accent py-4 text-center relative mb-2">
          <h3 className="text-[16px] md:text-[20px] lg:text-[24px] text-center bg-accent !text-white">
            Créer un menu
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
              type="number"
              id="price"
              name="price"
              required
              className="border  border-gray-300 bg-white focus:outline-none w-full py-2 px-3"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="dishes"
              className="block text-primary font-semibold mb-2"
            >
              Plats
            </label>
            <div id="dishes-container">
              <input
                type="text"
                id="dishes"
                name="dishes"
                required
                className="border my-1  border-gray-300 bg-white focus:outline-none w-full py-2 px-3"
              />
            </div>
            <div className="flex mt-2 flex-row gap-10 justify-start itc">
              <Button
                id="add-dish-button"
                variant={'outline'}
                className="hover:text-white mt-1"
                onClick={(e) => {
                  e.preventDefault();
                  const container = document.getElementById('dishes-container');
                  const newInput = document.createElement('input');
                  newInput.type = 'text';
                  newInput.name = 'dishes';
                  newInput.required = true;
                  newInput.className =
                    'border my-1  border-gray-300 bg-white focus:outline-none w-full py-2 px-3 ';
                  container?.appendChild(newInput);
                }}
              >
                +
              </Button>

              <Button
                variant={'secondary'}
                id="remove-dish-button"
                className="text-white mt-1 bg-accent hover:bg-accent-hover"
                onClick={(e) => {
                  e.preventDefault();
                  const container = document.getElementById('dishes-container');
                  const children = container && container.children;
                  if (children && children.length > 1) {
                    container?.removeChild(children[children.length - 1]);
                  }
                }}
              >
                -
              </Button>
            </div>
          </div>

          <label
            htmlFor="descriptions"
            className="block text-primary font-semibold my-4"
          >
            Descriptions
          </label>
          <div className="mb-2 mt-2" id="desc-container">
            <textarea
              name="descriptions"
              id="descriptions"
              required
              className="border my-1 min-h-[150px] border-gray-300 bg-white focus:outline-none w-full py-2 px-3"
            />
          </div>

          <div className="flex flex-row gap-10 justify-start">
            <Button
              id="add-desc-button"
              variant={'outline'}
              className="hover:text-white mt-1"
              onClick={(e) => {
                e.preventDefault();
                const container = document.getElementById('desc-container');
                const newInput = document.createElement('textarea');
                newInput.name = 'descriptions';
                newInput.required = true;
                newInput.className =
                  'border my-1 min-h-[150px] border-gray-300 bg-white focus:outline-none w-full py-2 px-3';
                const textareas = container?.querySelectorAll('textarea');
                const lastTextarea = textareas ? [textareas.length - 1] : null;
                if (lastTextarea) {
                  container?.appendChild(newInput);
                }
              }}
            >
              +
            </Button>

            <Button
              variant={'secondary'}
              id="remove-desc-button"
              className="text-white mt-1 bg-accent hover:bg-accent-hover"
              onClick={(e) => {
                e.preventDefault();
                const container = document.getElementById('desc-container');
                const children = container && container.children;
                if (children && children.length > 1) {
                  container?.removeChild(children[children.length - 1]);
                }
              }}
            >
              -
            </Button>
          </div>
        </div>

        <div className="flex flex-col my-6 items-center gap-5">
          <Button
            type="submit"
            disabled={isPending}
            className="hover:text-white py-6 px-4"
          >
            {isPending ? 'En cours...' : 'Créer le menu'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddMenu;
