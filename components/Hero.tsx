import Image from 'next/image';
import React from 'react';

const Hero = () => {
  return (
    <section className="flex-1 relative flex min-h-[calc(100vh-128.17px)] md:min-h-[calc(100vh-76.17px)] w-full">
      <Image
        src={'/assets/hero/bgMain.jpg'}
        alt="hero"
        fill
        className="object-cover h-full w-auto"
      />
      <div className="absolute top-0 left-0 bg-[#00000080] w-full h-full z-10" />
      <div className="absolute top-0 left-0 w-full h-full z-20 flex flex-col items-center gap-10 justify-center">
        <h1 className="text-5xl lg:text-7xl font-bold font-primary !text-white ">
          A Petra Serena
        </h1>
        <p className="text-xl lg:text-2xl max-w-[70%] mx-auto text-center font-primary !text-white">
          Là où la Corse révèle toute sa beauté.
          <br />
          Un havre de paix entre mer, maquis et élégance.
        </p>
      </div>
    </section>
  );
};

export default Hero;
