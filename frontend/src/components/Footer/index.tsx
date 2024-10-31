import React from 'react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { TbMapSearch } from "react-icons/tb";
import Image from 'next/image';
import { BsFillTelephoneFill } from "react-icons/bs";

const ContactSection = () => {
  return (
    <section
      className="relative w-full py-10 bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://ledstattoo.com.br/templates/yootheme/cache/bg-01-d805f7dc.webp")',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-10 text-white">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">Follow us on Instagram</h2>
        <hr className="border-t-2 border-[#a68d7a] mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
          <a href="https://maps.app.goo.gl/Say4gmnRPB5VJHme9" target="_blank" rel="noopener noreferrer" className="flex flex-col justify-center md:flex-row md:justify-start items-center">
            <TbMapSearch className='mr-2 text-[#a68d7a] text-2xl md:text-3xl hover:text-[#7a5e4d] transition-colors duration-300' />
            <span className="text-lg md:text-xl">Where We Are</span>
          </a>
          <div className="flex flex-col items-center md:items-end md:justify-end">
            <span className="text-lg md:text-xl">199 Rodbourne RD, SN2 2AA</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left mt-6">
          <div className="flex justify-center md:justify-start items-center">
            <span className="text-lg md:text-xl">Swindon UK</span>
          </div>
          <a href='https://wa.me/447491282294' className="flex justify-center md:justify-end hover:text-[#7a5e4d] transition-colors duration-300 items-center">
            <BsFillTelephoneFill className="mr-2 text-[#a68d7a] text-2xl md:text-3xl hover:text-[#7a5e4d] transition-colors duration-300" />
            <span className="text-lg md:text-xl">07491 282294</span>
          </a>
        </div>

        <div className="flex justify-center mt-6 md:mt-10">
          <a href='/'>
          <Image src="/images/La_Migra_Ink.png" alt="La Migra logo" width={190} height={50} className="w-auto h-auto md:w-[250px] md:h-auto lg:w-[300px]" />
          </a>
        </div>

        <div className="flex justify-center mt-8 md:mt-12">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="mx-4">
            <FaInstagram className="text-[#a68d7a] text-4xl md:text-5xl hover:text-[#7a5e4d] transition-colors duration-300" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="mx-4">
            <FaFacebook className="text-[#a68d7a] text-4xl md:text-5xl hover:text-[#7a5e4d] transition-colors duration-300" />
          </a>
        </div>
        <div className="flex justify-center text-zinc-500 mt-8 md:mt-10">
          <span className="text-sm md:text-base">Creator and Publisher @Kartus</span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
