'use client';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

// --------------- Import Internes ------------------------------
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Menu } from '@/types/menuType';
import { getAllMenus } from '@/app/actions/menuCrud';
import { Button } from '../ui/button';

const AdminRestaurant = () => {
  // -------------------- Hooks -------------------------------
  const [menus, setMenus] = useState<Menu[]>();
  const [initialMenu, setInitialMenu] = useState<Menu[]>();
  const router = useRouter();

  // -------------------- Fonctions -------------------------------
  const handleUpdate = (id: string) => {
    router.push(`/profil/admin/menu/${id}`);
  };

  const handleCreateMenu = () => {
    router.push(`/profil/admin/menu/add`);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    if (searchValue === '') {
      setMenus(initialMenu); // réinitialise la liste des menus à son état initial
    } else {
      const filteredMenu = menus?.filter(
        (menu) =>
          menu.room.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          menu.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setMenus(filteredMenu);
    }
  };

  // -------------------- useEffect -------------------------------
  useEffect(() => {
    const getMenus = async () => {
      const menusData = await getAllMenus();
      setMenus(menusData);
      setInitialMenu(menusData);
    };
    getMenus();
  }, []);

  // -------------------- Return -------------------------------

  if (!menus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h3>...Loading</h3>
      </div>
    );
  }

  return (
    <section className="md:w-[80%] lg:w-[70%] xl:w-[50%] w-[95%] mx-auto flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full my-3 relative mx-auto ">
          <FaSearch className="absolute top-3 right-2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un menu"
            className="border border-gray-300 mb-6 bg-white focus:outline-none w-full py-2 px-3"
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <Table className="w-full">
          <TableHeader className="bg-accent  text-white">
            <TableRow>
              <TableHead className="text-center font-semibold">Titre</TableHead>
              <TableHead className="text-center font-semibold">
                Nombre de plats
              </TableHead>
              <TableHead className="text-center font-semibold">Prix</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menus.length > 0 ? (
              menus.map((menu) => (
                <TableRow
                  key={menu.$id}
                  className="text-center cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={() => handleUpdate(menu.$id)}
                >
                  <TableCell className="font-medium text-center">
                    {menu.title}
                  </TableCell>
                  <TableCell>{menu.dishes.length}</TableCell>

                  <TableCell className="text-center">{menu.price}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="">
                <TableCell className="text-center">
                  Aucun menu trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="w-full flex items-center justify-center my-4">
          <Button
            onClick={handleCreateMenu}
            className="hover:text-white mt-4 py-6 px-3 transition-all"
          >
            Ajouter un menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AdminRestaurant;
