import SpaCard from '@/components/SpaCard';
import Image from 'next/image';
import React from 'react';

const SpaPage = () => {
  const mainImage = '/assets/spa/mainSpa.jpg';
  const spa1Image = '/assets/spa/spa1.jpg';
  const spa2Image = '/assets/spa/spa2.jpg';
  const spa3Image = '/assets/spa/spa3.jpg';
  return (
    <main className="min-h-full flex flex-col gap-10">
      <section className="flex-1 relative flex min-h-[calc(100vh-128.17px)] md:min-h-[calc(100vh-76.17px)] w-full mb-6">
        <Image
          src={mainImage && mainImage}
          alt="resto"
          fill
          className={'object-cover absolute top-0 left-0 z-0 w-full h-[82.5vh]'}
        />
        <div className="absolute top-0 left-0 bg-[#00000090] w-full h-full z-10" />
        <div className="absolute top-0 left-0 w-full h-full z-20 flex flex-col items-center gap-10 justify-center">
          <h1 className="text-5xl lg:text-7xl font-bold font-primary !text-white text-center ">
            Espace Bien-Être <br />&<br />
            Sérénité
          </h1>
          <p className="text-2xl lg:text-4xl max-w-[70%] mx-auto text-center font-primary !text-white">
            Laissez le temps s&apos;arrêter et offrez à votre corps un moment
            d&apos;évasion absolue. Bienvenue au Spa A Petra Serena.
          </p>
        </div>
        <p className="absolute bottom-4 right-4 text-base md:text-lg font-primary text-white z-20">
          de 9h00 à 20h00
        </p>
      </section>
      <section className="flex flex-col items-center gap-6 min-h-[70vh]">
        <div className="flex px-6 md:px-16 lg:px-32 xl:px-40 justify-between gap-6 flex-col  items-center ">
          <h2 className="text-3xl md:text-4xl font-bold font-primary text-center">
            Un havre de sérénité au cœur de la Corse
          </h2>
          <div className="flex flex-col items-center gap-10">
            <p className="md:max-w-[70%] text-sm md:text-base text-center mb-12 md:text-left text-wrap">
              Né de l&apos;alliance entre le savoir-faire traditionnel et
              l&apos;art de vivre insulaire, notre Spa vous invite à une
              parenthèse hors du temps. Inspiré par la nature corse — ses
              plantes aromatiques, ses roches et ses eaux pures — chaque soin
              célèbre le lien profond entre le corps et l&apos;environnement.
              Dans une atmosphère apaisante, baignée de lumière douce et de
              matières naturelles, nos rituels associent techniques modernes et
              inspirations ancestrales, pour offrir équilibre et bien-être.
              Massages, soins du visage, espace relaxation... Chaque détail a
              été pensé pour éveiller vos sens et libérer les tensions, en
              harmonie avec la beauté sauvage de l&apos;île.
            </p>
            {/* IMAGES */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-6">
              <Image
                alt="spa1"
                src={spa1Image}
                width={500}
                height={600}
                className="object-cover w-[70%] px-2 md:w-[31.8%]"
              />
              <Image
                alt="spa2"
                src={spa2Image}
                width={500}
                height={500}
                className="object-cover w-[70%] px-2 md:w-[30%] md:h-[30%]"
              />
              <Image
                alt="spa3"
                src={spa3Image}
                width={500}
                height={500}
                className="object-cover w-[70%] px-2 md:w-[30%] md:h-[30%]"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto flex flex-col gap-6 items-center justify-center">
        <div className="h-px bg-gray-300 w-[50%] my-2" />
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
          Nos Soins
        </h3>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          <SpaCard />
        </div>
      </section>
    </main>
  );
};

export default SpaPage;
