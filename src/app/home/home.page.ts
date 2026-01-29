import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { storage } from '../services/storage';
import { Router } from '@angular/router';
import { Music } from '../services/music';
import { SongsModalPage } from '../songs-modal/songs-modal.page'; 
import { addIcons } from 'ionicons';
import { play, playOutline, heartOutline, playCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class HomePage implements OnInit {
  introYaVista: boolean = false;
  songs: any[] = []; 
  serverArtists: any[] = []; 

  genres = [
    { title: "Música Clásica", image: "https://static.vecteezy.com/system/resources/previews/003/335/968/large_2x/the-violin-on-table-classic-musical-instrument-used-in-the-orchestra-free-photo.jpg", description: "Vibra al ritmo clásico." },
    { title: "Afrobeats", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfJBwAN8Kiw2yTqSZW3_wOh0OicpxVHTdcVg&s", description: "Ritmos de África." },
    { title: "Rock & Roll", image: "https://static.vecteezy.com/system/resources/thumbnails/003/024/270/small_2x/hand-rock-and-roll-composition-illustration-vector.jpg", description: "Energía pura." }
  ];

  constructor(
    private storageService: storage, 
    private router: Router, 
    private musicService: Music,
    private modalController: ModalController 
  ) {
    addIcons({ play, playOutline, heartOutline, playCircleOutline });
  }

  async ngOnInit() {
    await this.checkIntroStatus();
    this.loadTracks(); 
    this.loadArtists(); 
  }

  // TAREA 1: Consumir el servicio de artistas
  async loadArtists() {
    this.serverArtists = await this.musicService.getArtists();
  }

  async loadTracks() {
    this.songs = await this.musicService.getTracks(); 
  }

  // TAREA 2: Consumir el servicio de canciones por artista
  async ShowSongsByArtists(artist: any) {
    // Llamada al servicio
    let tracks = await this.musicService.getTracksByArtist(artist.id);

    // Respaldo local si el servicio no trajo datos (JSON local)
    if (!tracks || tracks.length === 0) {
      const localData = this.musicService.getLocalArtists();
      const match = localData.artists.find(
        (a: any) => a.name.toLowerCase() === artist.name.toLowerCase()
      );
      
      if (match && match.albums) {
        tracks = []; // Limpiamos para llenar con local
        match.albums.forEach((album: any) => {
          if (album.songs) {
            album.songs.forEach((s: any) => {
              tracks.push({ name: s.title, artist: match.name, image: artist.image });
            });
          }
        });
      }
    }

    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: { artistName: artist.name, songs: tracks }
    });
    return await modal.present();
  }

  async checkIntroStatus(){
    const visto = await this.storageService.get('isIntroShowed');
    this.introYaVista = visto === true;
  }

  irAIntro(){ this.router.navigateByUrl('/intro'); }
}