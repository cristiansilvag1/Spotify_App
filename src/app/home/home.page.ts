import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { storage } from '../services/storage';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {

  // Paleta oficial de Spotify
  colorClaro = '#FFFFFF';      // Blanco para modo claro
  colorOscuro = '#121212';     // Negro Spotify
  colorActual = this.colorOscuro;

  genres = [
    {
      title: "Music Classic",
      image: "https://static.vecteezy.com/system/resources/previews/003/335/968/large_2x/the-violin-on-table-classic-musical-instrument-used-in-the-orchestra-free-photo.jpg",
      description: "Vibra al ritmo de la música clásica."
    },
    {
      title: "Afrobeats",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfJBwAN8Kiw2yTqSZW3_wOh0OicpxVHTdcVg&s",
      description: "Los mejores temas de Afrobeats están aquí, con ritmos que te harán mover el cuerpo."
    },
    {
      title: "Rock & Roll",
      image: "https://static.vecteezy.com/system/resources/thumbnails/003/024/270/small_2x/hand-rock-and-roll-composition-illustration-vector.jpg",
      description: "Siente la energía de los clásicos del Rock & Roll y baterías potentes."
    }
  ];

  constructor(private storage: storage, private: router: Router) {}


  async ngOnInit() {
    await this.loadStorageData();
  }

  async cambiarColor(): Promise<void> {
    this.colorActual =
      this.colorActual === this.colorOscuro
        ? this.colorClaro
        : this.colorOscuro;

    await this.storage.set('theme', this.colorActual);
    console.log('tema guardado', this.colorActual);
  }
  async loadStorageData(){
    const savedTheme = await this.storage.get('theme');
    this.colorActual = savedTheme;
  }
  irAIntro(){
    this.router.navigateByUrl('/intro')
  }
}
