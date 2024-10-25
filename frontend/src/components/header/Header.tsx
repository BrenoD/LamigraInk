import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeaderProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
    refs: {
        gallery: React.RefObject<HTMLDivElement>;
        youtube: React.RefObject<HTMLDivElement>;
        aftercare: React.RefObject<HTMLDivElement>;
        placement: React.RefObject<HTMLDivElement>;
        booking: React.RefObject<HTMLDivElement>;
        giftCards: React.RefObject<HTMLDivElement>;
    };
}

const Header: React.FC<HeaderProps> = ({ isOpen, setIsOpen, scrollToSection, refs }) => {
    const [activeSection, setActiveSection] = useState('HOME');
    const [isScrolled, setIsScrolled] = useState(false);

    const sections = [
        { name: 'HOME', onClick: () => {} },
        { name: 'GALLERY', onClick: () => scrollToSection(refs.gallery) },
        { name: 'YOUTUBE', onClick: () => scrollToSection(refs.youtube) },
        { name: 'AFTERCARE', onClick: () => scrollToSection(refs.aftercare) },
        { name: 'LOCATION', onClick: () => scrollToSection(refs.placement) },
        { name: 'BOOKING', onClick: () => scrollToSection(refs.booking) },
        { name: 'GIFT CARDS', onClick: () => scrollToSection(refs.giftCards) },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <header className={`flex items-center justify-between px-5 md:px-10 py-5 fixed w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-zinc-900' : 'bg-transparent'}`}>
                <div className="logo">
                    <Image src="/images/La_Migra_Ink.png" alt="La Migra logo" width={190} height={50} />
                </div>
                <div className="hidden md:flex space-x-10">
                    {sections.map((section) => (
                        <a 
                            key={section.name} 
                            href="#" 
                            className={`relative text-white hover:text-orange-300`}
                            onClick={() => setActiveSection(section.name)}
                        >
                            {section.name}
                            <span className={`absolute left-0 right-0 bottom-0 h-0.5 bg-orange-300 transform scale-x-0 transition-transform duration-300 ${activeSection === section.name ? 'scale-x-100' : ''}`}></span>
                        </a>
                    ))}
                </div>
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </header>

            {isOpen && (
                <div className="fixed inset-0 bg-zinc-900 bg-opacity-50 z-40" onClick={() => setIsOpen(false)}></div>
            )}

            <div className={`fixed top-0 left-0 h-full w-64 bg-stone-900 flex flex-col items-center transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} z-50`}>
                <button onClick={() => setIsOpen(false)} className="text-white p-2 self-end">❌</button>
                {sections.map((section) => (
                    <a 
                        key={section.name} 
                        href="#" 
                        className={`block p-2 text-white w-full text-center hover:text-orange-300 hover:opacity-40 ${activeSection === section.name ? 'bg-zinc-700 text-white' : 'text-white'}`}
                        onClick={() => setActiveSection(section.name)}
                    >
                        {section.name}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Header;
