import Image from 'next/image';
import React from 'react';

const SpaCard = () => {
  const spaMenu = [
    {
      title: `Rituel "Essence du Maquis"`,
      description:
        'Un massage enveloppant inspiré des senteurs du maquis corse, alliant huiles essentielles locales et gestes profonds pour relâcher les tensions et reconnecter corps et esprit.',
      price: '120€',
      time: '60 min',
    },
    {
      title: `Soin "Éclat d'Île"`,
      description:
        'Un massage enveloppant inspiré des senteurs du maquis corse, alliant huiles essentielles locales et gestes profonds pour relâcher les tensions et reconnecter corps et esprit.',
      price: '95€ ',
      time: '45 min',
    },
    {
      title: `Modelage "Onde Marine"`,
      description:
        'Un massage corps complet associant mouvements fluides et pression douce, inspiré par le va-et-vient des vagues, pour un lâcher-prise absolu.',
      price: '135€',
      time: '75 min',
    },
    {
      title: `Gommage "Roche & Sel"`,
      description:
        'Exfoliation corps au sel marin et pierres volcaniques, éliminant impuretés et fatigue pour une peau douce, régénérée et vivifiée.',
      price: '75€',
      time: '40 min',
    },
    {
      title: `Soin Signature "L'Âme de l'Île"`,
      description:
        'Une expérience sensorielle complète mêlant gommage, massage et enveloppement aux essences corses, pour un voyage intérieur inoubliable au cœur de la nature.',
      price: '170€',
      time: '90 min',
    },
  ];
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
      <div className="flex w-full flex-col items-center justify-center">
        {spaMenu.map((spa, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center px-10 justify-center">
              <p className="text-lg md:text-xl font-bold font-primary mt-2 text-center">
                {spa.title}
              </p>
              <p className="text-sm md:text-base  text-center my-3">
                {spa.description}
              </p>
              <p className="font-semibold text-lg text-center my-3">
                {spa.price} / {spa.time}
              </p>
            </div>
            <div className="h-px bg-gray-300 w-[50%] my-2" />
          </div>
        ))}
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

export default SpaCard;
