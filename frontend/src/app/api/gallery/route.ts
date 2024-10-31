import { promises as fs } from 'fs';
import path from 'path';

const artistFolderMap: { [key: string]: string } = {
  'moises-alves': 'Moises',
  'megan': 'Megan',
  'vini-capobianco': 'Vini'
};

export async function GET(request: Request) {
  try {
    const artistId = new URL(request.url).searchParams.get('artist');
    if (!artistId) {
      return new Response('Artist ID is required', { status: 400 });
    }

    const artistFolder = artistFolderMap[artistId];
    if (!artistFolder) {
      return new Response('Artist folder not found', { status: 404 });
    }

    const galleryPath = path.join(process.cwd(), 'public', 'artists', 'gallery', artistFolder);
    
    try {
      const files = await fs.readdir(galleryPath);
      const galleryFiles = files.map(file => `/artists/gallery/${artistFolder}/${file}`);
      
      return new Response(JSON.stringify(galleryFiles), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (_) {
      // Se a pasta não existir, retorna array vazio
      return new Response(JSON.stringify([]), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (_) {
    return new Response('Error reading gallery', { status: 500 });
  }
} 
