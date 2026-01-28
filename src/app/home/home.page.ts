import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { storage } from '../services/storage';
import { Router } from '@angular/router';
import { Music } from '../services/music';
import { addIcons } from 'ionicons';
import { play, playOutline, heartOutline } from 'ionicons/icons';

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

  genres = [
    {
      title: "Music Classic",
      image: "https://static.vecteezy.com/system/resources/previews/003/335/968/large_2x/the-violin-on-table-classic-musical-instrument-used-in-the-orchestra-free-photo.jpg",
      description: "Vibra al ritmo de la música clásica."
    },
    {
      title: "Afrobeats",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfJBwAN8Kiw2yTqSZW3_wOh0OicpxVHTdcVg&s",
      description: "Los mejores temas de Afrobeats están aquí."
    },
    {
      title: "Rock & Roll",
      image: "https://static.vecteezy.com/system/resources/thumbnails/003/024/270/small_2x/hand-rock-and-roll-composition-illustration-vector.jpg",
      description: "Siente la energía de los clásicos del Rock."
    },
  ];

  constructor(private storage: storage, private router: Router, private musicService: Music) {
    addIcons({ play, playOutline, heartOutline });
  }

  async ngOnInit() {
    await this.checkIntroStatus();
    this.loadTracks(); 
  }

  async loadTracks() {
    try {
      const tracks = await this.musicService.getTracks(); 
      this.songs = tracks; 
    } catch (error) {
      console.error("Error cargando música:", error);
    }
  }

  async checkIntroStatus(){
    const visto = await this.storage.get('isIntroShowed');
    this.introYaVista = visto === true;
  }

  irAIntro(){
    this.router.navigateByUrl('/intro');
  }
}