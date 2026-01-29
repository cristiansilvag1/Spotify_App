import { Injectable } from '@angular/core';
import * as dataArtists from './artistas.json';

@Injectable({
  providedIn: 'root',
})
export class Music {
  // Configuración de la API
  baseUrl = 'http://localhost:3000'; 
  proxy = 'https://corsproxy.io/?';

  constructor() {}

  /**
   * TAREA: Servicio para obtener los artistas desde el servidor
   */
  async getArtists() {
    try {
      const response = await fetch(`${this.baseUrl}/artists`);
      if (!response.ok) throw new Error('Error al conectar con el servidor');
      return await response.json();
    } catch (error) {
      console.warn('Servidor offline. Cargando artistas de respaldo...');
      // Retornamos una lista estática si el servidor no responde
      return [
        { id: 1, name: 'Bad Bunny', image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=200' },
        { id: 2, name: 'Karol G', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200' },
        { id: 3, name: 'Feid', image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=200' }
      ];
    }
  }

  /**
   * TAREA: Servicio para obtener las canciones de un artista
   */
  async getTracksByArtist(artistId: number | string) {
    try {
      const response = await fetch(`${this.baseUrl}/tracks/artist/${artistId}`);
      if (!response.ok) throw new Error();
      return await response.json();
    } catch (error) {
      console.error('No se pudieron obtener canciones del servidor');
      return []; // El componente decidirá si usar el JSON local
    }
  }

  /**
   * Extra: Obtener hits globales (Deezer)
   */
  async getTracks() {
    try {
      const response = await fetch(`${this.proxy}https://api.deezer.com/chart`);
      const data = await response.json();
      return data.tracks.data.map((song: any) => ({
        name: song.title,
        artist: song.artist.name,
        image: song.album.cover_medium,
        preview: song.preview,
        album: song.album.title
      }));
    } catch (error) {
      return [];
    }
  }

  // Helper para el JSON local
  getLocalArtists() {
    return (dataArtists as any).default || dataArtists;
  }
}