import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Music {
  // Usamos el proxy de Deezer o una búsqueda directa
  urlServer = 'https://api.deezer.com/chart'; 

  async getTracks() {
    // Usamos un proxy para evitar errores de CORS en el navegador
    const proxy = 'https://corsproxy.io/?';
    const response = await fetch(`${proxy}${this.urlServer}`);
    const data = await response.json();
    
    // Mapeamos para que coincida con tus nombres (name, artist, image)
    return data.tracks.data.map((song: any) => ({
      name: song.title,
      artist: song.artist.name,
      image: song.album.cover_medium, // Imágenes de alta calidad
      preview: song.preview // El audio real para escuchar
    }));
  }
}