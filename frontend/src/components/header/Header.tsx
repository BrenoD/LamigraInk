import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
        artistsSection: React.RefObject<HTMLDivElement>;
    };
}

const Header: React.FC<HeaderProps> = ({ isOpen, setIsOpen, scrollToSection, refs }) => {
    const [activeSection, setActiveSection] = useState('HOME');
    const [isScrolled, setIsScrolled] = useState(false);

    const router = useRouter(); // Move para um ponto seguro, fora do hook de renderização

    const sections = [
        { name: 'HOME', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        {
            name: 'OUR TEAM', onClick: () => {
                scrollToSection(refs.artistsSection);
                setActiveSection('OUR TEAM');
            }
        },
        {
            name: 'YOUTUBE', onClick: () => {
                scrollToSection(refs.youtube);
                setActiveSection('YOUTUBE');
            }
        },
        {
            name: 'AFTERCARE', onClick: () => {
                scrollToSection(refs.aftercare);
                setActiveSection('AFTERCARE');
            }
        },
        {
            name: 'LOCATION', onClick: () => {
                scrollToSection(refs.placement);
                setActiveSection('LOCATION');
            }
        },
        {
            name: 'BOOKING', onClick: () => {
                scrollToSection(refs.booking);
                setActiveSection('BOOKING');
            }
        },
        {
            name: 'GIFT CARDS', onClick: () => {
                router.push('/GiftCard'); // Usa o router para redirecionar
                setActiveSection('GIFT CARDS');
            }
        },
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
                            onClick={(e) => {
                                e.preventDefault();
                                section.onClick(); // Chama a função para rolar até a seção correspondente ou redirecionar
                            }}
                        >
                            {section.name}
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
                        onClick={(e) => {
                            e.preventDefault();
                            section.onClick(); // Chama a função para rolar até a seção correspondente ou redirecionar
                            setIsOpen(false); // Fecha o menu depois de clicar em uma seção
                        }}
                    >
                        {section.name}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Header;
