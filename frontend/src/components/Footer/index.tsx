import React from 'react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Follow us on Instagram</h2>
        <hr className="border-t-2 border-[#a68d7a] mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center">
            <FaInstagram className="mr-2 text-[#a68d7a]" />
            <span>Where We Are</span>
          </div>
          <div className="flex justify-center md:justify-end items-center">
            <span>Avenida Ibirapuera, 3478</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left mt-4">
          <div className="flex justify-center md:justify-start items-center">
            <span>Moema, São Paulo - SP</span>
          </div>
          <div className="flex justify-center md:justify-end items-center">
            <FaFacebook className="mr-2 text-[#a68d7a]" />
            <span>(11) 94486-3323</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left mt-4">
          <div className="flex justify-center md:justify-start items-center">
            <span>ZIP Code 04028-003</span>
          </div>
          <div className="flex justify-center md:justify-end items-center">
            <span>contact@ledstattoo.com.br</span>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2">
            <FaInstagram className="text-3xl text-[#a68d7a]" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2">
            <FaFacebook className="text-3xl text-[#a68d7a]" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
