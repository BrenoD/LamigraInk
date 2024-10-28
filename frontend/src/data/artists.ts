export interface Artist {
  id: string;
  name: string;
  profileImage: string;
  description: string;
  gallery: string[];
}

export const artistsData: Artist[] = [
  {
    id: 'moises-alves',
    name: 'Moises Alves',
    profileImage: '/artists/moises-perfil-400px.webp',
    description: 'I have been a tattoo artist for 20 years, learning different ways to bring your dream to reality. I am always available to talk with the client, before starting the project.',
    gallery: [
      '/artists/gallery/Moises/file.mp4',
      '/artists/joao-work-2.jpg',
      '/artists/joao-work-3.jpg',
    ],
  },
  {
    id: 'maria-santos',
    name: 'Maria Santos',
    profileImage: '/artists/maria-profile.jpg',
    description: 'Artista especializada em aquarela e designs minimalistas. Premiada internacionalmente.',
    gallery: [
      '/artists/maria-work-1.jpg',
      '/artists/maria-work-2.jpg',
      '/artists/maria-work-3.jpg',
    ],
  },
  {
    id: 'pedro-oliveira',
    name: 'Pedro Oliveira',
    profileImage: '/artists/pedro-profile.jpg',
    description: 'Mestre em tatuagens orientais e designs geométricos complexos.',
    gallery: [
      '/artists/pedro-work-1.jpg',
      '/artists/pedro-work-2.jpg',
      '/artists/pedro-work-3.jpg',
    ],
  },
];
