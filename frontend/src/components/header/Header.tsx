import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Header = ({ isOpen, setIsOpen }) => {
    const [activeSection, setActiveSection] = useState('HOME'); // Estado para controlar a seção ativa
    const [isScrolled, setIsScrolled] = useState(false); // Estado para controlar o fundo do header

    const sections = ['HOME', 'O ESTÚDIO', 'SERVIÇOS', 'ARTISTAS', 'ESTILOS', 'CONTATO'];

    // Hook para monitorar o scroll da página
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY; // Posição vertical do scroll
            if (scrollTop > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <header className={`flex items-center justify-between p-5 fixed w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-zinc-900' : 'bg-transparent'}`}>
                <div className="logo">
                    <Image src="/images/La_Migra_Ink.png" alt="logo La Migra" width={190} height={50} />
                </div>
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </header>

            {/* Overlay when the menu is open */}
            {isOpen && (
                <div className="fixed inset-0 bg-zinc-900 bg-opacity-50 z-40" onClick={() => setIsOpen(false)}></div>
            )}

            {/* Slide-out Menu */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-stone-900 flex flex-col items-center transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} z-50`}>
                <button onClick={() => setIsOpen(false)} className="text-white p-2 self-end">❌</button>
                {sections.map((section) => (
                    <a 
                        key={section} 
                        href="#" 
                        className={`block p-2 text-white w-full text-center hover:text-orange-300 hover:opacity-40 ${activeSection === section ? 'bg-zinc-700 text-white' : 'text-white'}`}
                        onClick={() => setActiveSection(section)}
                    >
                        {section}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Header;
