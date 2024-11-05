export interface Artist {
  id: string;
  name: string;
  description: string;
  profileImage: string;
  gallery: string[];
  experience?: string;
  specialities: string[];
  numberContact: string
}

// function getWhatsAppLink(number: string): string {
//   const message = "Hello! I would like to know more about the prices and the estimated time for a custom tattoo. Could you guys help me?";
//   const encodedMessage = encodeURIComponent(message);
//   return `https://wa.me/${number}?text=${encodedMessage}`;
// }


export const artistsData: Artist[] = [
  {
    id: 'moises-alves',
    name: 'Moises',
    description: 'Artist specialising in realism and blackwork...',
    profileImage: '/artists/moises-perfil-400px.webp',
    gallery: [],
    experience: '10',
    specialities: ['Blackwork', 'Realism', 'Oriental'],
    numberContact: '+44749282294'
  },
  {
    id: 'megan',
    name: 'Megan',
    profileImage: '/artists/megan.webp',
    description: 'Artist specialising in watercolour and minimalist designs. Internationally awarded.',
    gallery: [], // Will be populated dynamically
    experience: '10',
    specialities: ['Watercolour', 'Minimalist'],
    numberContact: '111111111'
  },
  {
    id: 'vini-capobianco',
    name: 'Vini Capobianco',
    profileImage: '/artists/vini.webp',
    description: 'Master in oriental tattoos and complex geometric designs.',
    gallery: [], // Will be populated dynamically
    experience: '10',
    specialities: ['Oriental', 'Geometric'],
    numberContact: '+447939587766'
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
