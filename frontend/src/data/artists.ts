export interface Artist {
  id: string;
  name: string;
  description: string;
  profileImage: string;
  gallery: string[];
  experience?: string;
  specialities: string[];
}

export const artistsData: Artist[] = [
  {
    id: 'moises-alves',
    name: 'Moises',
    description: 'Artist specialising in realism and blackwork...',
    profileImage: '/artists/moises-perfil-400px.webp',
    gallery: [],
    experience: '10',
    specialities: ['Blackwork', 'Realism', 'Oriental']
  },
  {
    id: 'megan',
    name: 'Megan',
    profileImage: '/artists/megan.webp',
    description: 'Artist specialising in watercolour and minimalist designs. Internationally awarded.',
    gallery: [], // Will be populated dynamically
    experience: '10',
    specialities: ['Watercolour', 'Minimalist']
  },
  {
    id: 'vini-capobianco',
    name: 'Vini Capobianco',
    profileImage: '/artists/vini.webp',
    description: 'Master in oriental tattoos and complex geometric designs.',
    gallery: [], // Will be populated dynamically
    experience: '10',
    specialities: ['Oriental', 'Geometric']
  },
];

// Function to load gallery dynamically
export async function loadArtistGallery(artistId: string) {
  try {
    const response = await fetch(`/api/gallery?artist=${artistId}`);
    if (!response.ok) {
      throw new Error('Failed to load gallery');
    }
    const gallery = await response.json();
    
    // Updates the artist's gallery
    const artist = artistsData.find(a => a.id === artistId);
    if (artist) {
      artist.gallery = gallery;
    }
    return gallery;
  } catch (error) {
    console.error('Error loading gallery:', error);
    return [];
  }
}
