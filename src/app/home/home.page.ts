import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { storage } from '../services/storage';
import { Router } from '@angular/router';
import { Music } from '../services/music';
import { SongsModalPage } from '../songs-modal/songs-modal.page'; 
import { addIcons } from 'ionicons';
import { 
  play, playOutline, heart, heartOutline, playCircleOutline, 
  pauseCircle, playCircle, playSkipBackSharp, 
  playSkipForwardSharp, chevronDownOutline, volumeMedium 
} from 'ionicons/icons';

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
  // Agregamos favorite y variables de progreso
  currentSong: any = { name: '', artist: '', image: '', preview: '', playing: false, favorite: false };
  songProgress: number = 0;
  songDuration: number = 0;

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
    addIcons({ 
      play, playOutline, heart, heartOutline, playCircleOutline, 
      pauseCircle, playCircle, playSkipBackSharp, 
      playSkipForwardSharp, chevronDownOutline, volumeMedium 
    });
  }

  async ngOnInit() {
    await this.checkIntroStatus();
    this.loadTracks(); 
    this.loadArtists(); 
  }

  // Lógica para el botón de favorito
  toggleFavorite() {
    this.currentSong.favorite = !this.currentSong.favorite;
  }

  async loadArtists() {
    this.serverArtists = await this.musicService.getArtists();
  }

  async loadTracks() {
    this.songs = await this.musicService.getTracks(); 
  }

  async ShowSongsByArtists(artist: any) {
    let tracks: any[] = [];
    try {
      tracks = await this.musicService.getTracksByArtist(artist.id);
    } catch (error) {
      console.warn("Error buscando tracks en servidor");
    }

    if (!tracks || tracks.length === 0) {
      const localData = this.musicService.getLocalArtists();
      const match = localData.artists.find((a: any) => a.id == artist.id);
      if (match && match.albums) {
        match.albums.forEach((album: any) => {
          if (album.songs) {
            album.songs.forEach((s: any) => {
              tracks.push({ 
                name: s.title, 
                artist: match.name, 
                image: artist.image,
                preview: s.preview
              });
            });
          }
        });
      }
    }

    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: { artistName: artist.name, songs: tracks }
    });

    modal.onDidDismiss().then((Res) => {
      if (Res.data) {
        this.currentSong = Res.data.selectedSong;
        this.currentSong.favorite = false; // Reset favorito al cambiar canción
      }
    });
    return await modal.present();
  }

  async checkIntroStatus(){
    const visto = await this.storageService.get('isIntroShowed');
    this.introYaVista = visto === true;
    if(!this.introYaVista) {
      this.irAIntro();
    }
  }

  irAIntro(){ 
    this.router.navigateByUrl('/intro'); 
  }
}