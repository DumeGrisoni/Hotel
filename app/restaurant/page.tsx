import MenuCard from '@/components/MenuCard';
import React from 'react';
import { getAllMenus } from '../actions/menuCrud';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RestaurantPage = async () => {
  const menus = await getAllMenus();
  const mainImage = '/assets/restaurant/restaurant.jpg';
  const dish1Image = '/assets/restaurant/MediumDish.jpg';
  const dish2Image = '/assets/restaurant/smallDish.jpg';

  if (!menus) {
    return (
      <p className="flex py-16 items-center justify-center">Chargement...</p>
    );
  }
  return (
    <main className="min-h-full flex flex-col gap-10">
      <section className="flex-1 relative flex min-h-[calc(100vh-128.17px)] md:min-h-[calc(100vh-76.17px)] w-full mb-6">
        <Image
          src={mainImage}
          alt="resto"
          fill
          className={'object-cover absolute top-0 left-0 z-0 w-full h-[82.5vh]'}
        />
        <div className="absolute top-0 left-0 bg-[#00000080] w-full h-full z-10" />
        <div className="absolute top-0 left-0 w-full h-full z-20 flex flex-col items-center gap-10 justify-center">
          <h1 className="text-5xl lg:text-7xl font-bold font-primary !text-white ">
            L&apos;Éveil
          </h1>
          <p className="text-2xl lg:text-4xl max-w-[70%] mx-auto text-center font-primary !text-white">
            L&apos;instant où la gourmandise devient émotion.
          </p>
        </div>
        <p className="absolute bottom-4 right-4 text-base md:text-lg font-primary text-white z-20">
          Par le Chef Giacomo Gianni
        </p>
      </section>
      <section className="flex flex-col items-center  gap-6 min-h-[70vh]">
        <div className="flex px-6 md:px-16 lg:px-32 xl:px-40 justify-between gap-6 flex-col md:flex-row items-center md:items-start">
          <h2 className="text-3xl md:text-4xl font-bold font-primary text-center">
            Notre travail
          </h2>
          <div className="flex flex-col items-end gap-10">
            <p className="md:max-w-[70%] text-sm md:text-base text-center mb-12 md:text-left text-wrap">
              Au Restaurant L&apos;Éveil, nous mettons l&apos;accent sur la
              qualité, chaque assiette est l&apos;expression d&apos;un
              engagement profond envers la qualité et l&apos;authenticité. Nos
              produits sont issus de producteurs locaux, sélectionnés avec soin
              pour leur respect du terroir et des saisons. Nous privilégions les
              circuits courts et travaillons des ingrédients d&apos;exception,
              récoltés au plus près de leur maturité, afin de préserver toutes
              leurs saveurs. En cuisine, nos chefs conjuguent savoir-faire
              traditionnel et créativité, sublimant chaque produit dans le
              respect de son caractère naturel. Une démarche sincère qui fait de
              chaque plat une expérience aussi éthique que gourmande.
            </p>
            {/* IMAGES */}
            <div className="flex flex-col md:flex-row gap-6 justify-end mb-6">
              <Image
                alt="dish1"
                src={dish1Image}
                width={2000}
                height={2000}
                className="object-cover w-auto h-full px-2 md:w-[50%] md:h-[50%] lg:w-[30%] lg:h-[30%]"
              />
              <Image
                alt="dish1"
                src={dish2Image}
                width={2000}
                height={2000}
                className="object-cover w-auto h-full px-2 md:w-[50%] md:h-[50%] lg:w-[30%] lg:h-[30%]"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto flex flex-col gap-6 items-center justify-center">
        <div className="relative z-0 w-[82px] h-[20px]">
          <Image
            src={'/assets/heading-icon.svg'}
            fill
            alt="icon-logo"
            className="object-cover absolute"
            priority
          />
        </div>
        <h3 className="text-3xl md:text-4xl font-bold font-primary">
          Nos Menus
        </h3>
        <Tabs
          className="w-full flex-1 flex-col items-center gap-4"
          defaultValue="tab1"
          orientation="horizontal"
        >
          <TabsList className="flex flex-col md:flex-row md:gap-6 mb-6">
            <TabsTrigger value="tab1">{menus[0].title}</TabsTrigger>
            <TabsTrigger value="tab2">{menus[1].title}</TabsTrigger>
          </TabsList>
          <div className="separator w-[95%] " />
          <TabsContent value="tab1" className="w-full">
            {menus.length > 0 && <MenuCard menu={menus[0]} />}
          </TabsContent>
          <TabsContent value="tab2" className="w-full">
            {menus.length > 0 && <MenuCard menu={menus[1]} />}
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default RestaurantPage;
