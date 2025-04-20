import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const ContactPage = () => {
  const socials = [
    { icons: <FaYoutube />, href: '/', text: 'Youtube' },
    { icons: <FaInstagram />, href: '/', text: 'Instagram' },
    { icons: <FaTwitter />, href: '/', text: 'Twitter' },
    { icons: <FaFacebook />, href: '/', text: 'Facebook' },
  ];
  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-12">
      <section className="mb-6 flex flex-col gap-4 items-center text-center justify-center w-[90%] md:w-[70%] lg:w-[50%] mx-auto">
        <h1 className="text-2xl font-semibold md:text-4xl !text-accent">
          Notre histoire
        </h1>
        <p>
          A Petra Serena est né d&apos;un amour sincère pour la Corse et son art
          de vivre. Inspiré par la force et la sérénité de la pierre — « Petra »
          — et la douceur des paysages environnants, notre hôtel vous invite à
          vivre un moment hors du temps, entre traditions locales et confort
          moderne.
        </p>
        <div className="h-px bg-gray-300 w-[50%] my-2" />
        <h2 className="text-xl font-semibold md:text-2xl !text-accent">
          Notre philosophie
        </h2>
        <p>
          Chaque séjour est une expérience sur mesure, où simplicité et élégance
          s&apos;accordent à la beauté sauvage des lieux. Nous cultivons
          l&apos;art de l&apos;accueil avec discrétion et sincérité, pour faire
          de votre passage un souvenir inoubliable.
        </p>
        <div className="h-px bg-gray-300 w-[50%] my-2" />
        <h2 className="text-xl font-semibold md:text-2xl !text-accent">
          Nos engagements
        </h2>
        <div className="flex flex-col gap-2 items-start">
          <p>🌿 Produits locaux & circuits courts</p>
          <p>💧 Respect de l&apos;environnement</p>
          <p>🛏️ Confort haut de gamme</p>
          <p>🤝 Accueil personnalisé et chaleureux</p>
        </div>
        <div className="h-px bg-gray-300 w-[50%] my-2" />
        <h2 className="text-xl font-semibold md:text-2xl !text-accent">
          Notre équipe
        </h2>
        <p>
          Derrière A Petra Serena, une équipe passionnée et attentionnée veille
          à chaque instant sur votre confort. Plus qu&apos;un séjour, nous vous
          offrons une immersion dans l&apos;âme corse, avec authenticité et
          bienveillance.
        </p>
        <div className="h-px bg-gray-300 w-[50%] my-2" />
        <h2 className="text-xl font-semibold md:text-2xl !text-accent">
          Nos services
        </h2>
        <p>
          Notre hôtel offre une gamme complète de services, alliant confort,
          sérénité et bienveillance. De la restauration au bien-etre, nous vous
          accompagnons dans votre voyage.
        </p>
        <div className="h-px bg-gray-300 w-[50%] my-2" />
        <h2 className="text-xl font-semibold md:text-2xl !text-accent">
          Notre devise
        </h2>
        <p>« Ici, chaque instant devient un souvenir précieux. »</p>
        <div className="h-px bg-gray-300 w-[50%] my-2" />
      </section>
      <section className="bg-tertiary shadow-xl w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] flex flex-col items-center justify-center ">
        <div className="bg-accent relative w-full mb-3 py-2">
          <h3 className="text-xl text-center !text-white ">Contactez-nous</h3>
          <div className="absolute -bottom-[8px] left-[calc(50%_-_10px)] w-0 h0 border-l-[10px] border-l-transparent border-t-[8px] border-t-accent border-r-[10px] border-r-transparent " />
        </div>
        <div className="flex py-6 flex-col md:flex-row items-center justify-center gap-3">
          <div className="flex flex-col w-full md:w-[70%] lg:[60%] xl:w-[50%] items-center justify-center gap-6">
            <div className="flex flex-col  justify-between items-center w-full ">
              <h3 className="text-lg font-semibold">Adresse</h3>
              <p className="text-center">20218 Moltifao Haute Corse</p>
            </div>
            <div className="flex flex-col  justify-between items-center w-full ">
              <h3 className="text-lg font-semibold">Telephone</h3>
              <p>04-00-00-00-00</p>
            </div>
            <div className="flex flex-col  justify-between items-center w-full ">
              <h3 className="text-lg font-semibold">Email</h3>
              <p>dominique.grisoni@gmail.com</p>
            </div>
          </div>
          <div className="h-px md:h-full bg-gray-300 w-[100%] my-2" />
          <div className="flex mb-6 mt-3 flex-col w-full md:w-[70%] lg:[60%] xl:w-[50%] items-center justify-center gap-4 md:gap-8">
            {socials.map((link, index) => (
              <Link
                href={link.href}
                key={index}
                className="flex flex-row !text-accent text-lg font-semibold hover:!text-accent-hover justify-start items-center w-[80%] px-6 gap-3"
              >
                <p>{link.icons}</p>
                <p>{link.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
