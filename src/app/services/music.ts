import { Injectable } from '@angular/core';
import * as dataArtists from './artistas.json';

@Injectable({
  providedIn: 'root',
})
export class Music {
  baseUrl = 'http://localhost:3000'; 
  proxy = 'https://corsproxy.io/?';

  constructor() {}

  // Helper para leer el JSON local correctamente
  getLocalArtists() {
    return (dataArtists as any).default || dataArtists;
  }

  /**
   * Obtener artistas: Si falla el server, usa artistas.json
   */
  async getArtists() {
    try {
      const response = await fetch(`${this.baseUrl}/artists`);
      if (!response.ok) throw new Error('Error al conectar');
      return await response.json();
    } catch (error) {
      console.warn('Servidor offline. Usando artistas.json local...');
      const local = this.getLocalArtists();
      // Retorna la lista de artistas de tu archivo local
      return local.artists; 
    }
  }

  /**
   * Obtener canciones por artista: Si falla el server, busca en artistas.json
   */
  async getTracksByArtist(artistId: number | string) {
    try {
      const response = await fetch(`${this.baseUrl}/tracks/artist/${artistId}`);
      if (!response.ok) throw new Error();
      return await response.json();
    } catch (error) {
      console.warn('Servidor offline. Buscando canciones en JSON local...');
      
      const local = this.getLocalArtists();
      // Buscamos el artista que coincida con el ID
      const artistMatch = local.artists.find((a: any) => a.id == artistId);
      
      if (artistMatch && artistMatch.albums) {
        let songs: any[] = [];
        artistMatch.albums.forEach((album: any) => {
          album.songs.forEach((s: any) => {
            songs.push({
              name: s.title,
              artist: artistMatch.name,
              image: artistMatch.image,
              preview: s.preview
            });
          });
        });
        return songs;
      }
      return [];
    }
  }

  /**
   * Obtener hits globales (Deezer)
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
      console.error('Error Deezer:', error);
      return [];
    }
  }
}