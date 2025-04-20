import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
  // ---------------------Render -----------------------------
  return (
    <main className="flex flex-col items-center justify-center gap-12">
      <Hero />
      <div className="flex flex-col items-center w-full md:w-[80%] lg:w-[60%] mx-auto text-center justify-center gap-6">
        <div className="relative z-0 w-[82px] h-[20px]">
          <Image
            src={'/assets/heading-icon.svg'}
            fill
            alt="icon-logo"
            className="object-cover absolute"
            priority
          />
        </div>
        <h1 className="text-2xl font-semibold md:text-4xl">Nos services</h1>
        <p className="text-justify md:text-center px-2 md:px-0">
          Au cœur des paysages sauvages et préservés de la Corse, A Petra Serena
          vous accueille dans un écrin de tranquillité où la nature
          s&apos;invite à chaque instant. Situé à flanc de colline, entre mer
          cristalline et maquis parfumé, notre hôtel offre une vue imprenable
          sur les reliefs corses et les couchers de soleil méditerranéens.
        </p>
        <div className="flex flex-col md:my-12 pb-4 md:pb-0 md:flex-row gap-4 items-center justify-center bg-gray-100">
          <Image
            src={'/assets/rooms/rMain.jpg'}
            width={1000}
            height={1000}
            alt="main2"
            className="w-full md:w-[400px] h-[400px] object-cover"
          />
          <div className="flex flex-col gap-8 items-center justify-center">
            <p className="text-justify md:text-left px-2 md:pr-4 text-sm md:text-base">
              Nos chambres et suites ont été pensées comme de véritables
              refuges, où confort et authenticité se rencontrent. Chaque espace
              reflète l&apos;âme de la Corse, entre matériaux nobles, tons doux
              et vues imprenables sur la nature environnante. Ici, tout invite à
              la sérénité : une literie haut de gamme, une atmosphère apaisante
              et le murmure discret du maquis en toile de fond.
            </p>
            <Link
              href="/room"
              className="!text-accent hover:!text-white pb-4 md:pb-0"
            >
              <Button className="!text-accent hover:!text-white py-6 cursor-pointer">
                Voir nos chambres
              </Button>
            </Link>
          </div>
        </div>
        <div className="h-px hidden md:block bg-gray-200 w-[70%] mx-auto my-2" />
        <div className="flex flex-col md:my-12 md:flex-row gap-4 items-center justify-center bg-gray-100">
          <Image
            src={'/assets/spa/spa2.jpg'}
            width={1000}
            height={1000}
            alt="main2"
            className="w-full md:w-[400px]"
          />
          <div className="flex flex-col gap-8 items-center justify-center">
            <p className="text-justify md:text-left px-2 md:pr-4 text-sm md:text-base">
              Prolongez l&apos;expérience dans notre Spa, inspiré des senteurs
              du maquis, où soins relaxants et rituels bien-être vous invitent à
              la détente. Le soir venu, notre restaurant célèbre les saveurs de
              la Corse à travers une cuisine raffinée, élaborée à partir de
              produits locaux, tandis que nos espaces détente — jardins,
              terrasses ombragées et salons intimistes — offrent un cadre
              apaisant pour savourer chaque instant.
            </p>
            <Link
              href="/spa"
              className="!text-accent hover:!text-white pb-4 md:pb-0"
            >
              <Button className="!text-accent hover:!text-white py-6 cursor-pointer">
                Voir notre Spa
              </Button>
            </Link>
          </div>
        </div>
        <div className="h-px bg-gray-300 w-full my-2" />
        <div className="flex flex-col md:my-12 md:flex-row gap-4 items-center justify-center bg-gray-100">
          <Image
            src={'/assets/restaurant/MediumDish.jpg'}
            width={1000}
            height={1000}
            alt="main2"
            className="w-full md:w-[400px]"
          />
          <div className="flex flex-col gap-8 items-center justify-center">
            <p className="text-justify md:text-left px-2 md:pr-4 text-sm md:text-base">
              Au restaurant de A Petra Serena, la Corse se découvre à chaque
              assiette. Nos chefs subliment les saveurs locales en travaillant
              des produits frais issus des terres et des côtes environnantes.
              Dans une atmosphère élégante et apaisante, face à la nature,
              chaque repas devient une expérience sensorielle où authenticité et
              créativité se rencontrent. Ici, le temps se savoure autant que la
              cuisine.
            </p>
            <Link
              href="/restaurant"
              className="!text-accent hover:!text-white pb-8 md:pb-0"
            >
              <Button className="!text-accent hover:!text-white py-6 cursor-pointer">
                Voir le restaurant
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Home;
