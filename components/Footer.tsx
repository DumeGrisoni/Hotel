import React from 'react';

const Footer = () => {
  return (
    <footer className=" bg-accent">
      <div className="contianer mx-auto text-white py-4 flex flex-col md:flex-row items-center justify-center gap-6">
        <p className="text-center">
          © 2023 A Petra Serena. Tous droits reservés.
        </p>
        <p className="text-center">Créer par: Dominique Grisoni</p>
      </div>
    </footer>
  );
};

export default Footer;
