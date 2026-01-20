import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { storage } from '../services/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {

  colorClaro = '#FFFFFF';
  colorOscuro = '#121212';
  colorActual = this.colorOscuro;
  
  // Nueva variable para saber si vio la intro
  introYaVista: boolean = false;

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
    },
    {
      title: "Champeta",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Champeta_dance.jpg/800px-Champeta_dance.jpg", // Corregí la imagen para que se vea
      description: "Ritmos africanos con influencias del reggae, el dancehall y la música afrocaribeña."
    }
  ];

  constructor(private storage: storage, private router: Router) {}

  async ngOnInit() {
    await this.loadStorageData();
  }

  // Cada vez que la página vuelva a estar activa, revisamos el storage
  // Esto es útil porque al volver de la Intro, ngOnInit no se vuelve a disparar
  async ionViewWillEnter() {
    await this.loadStorageData();
  }

  async cambiarColor(): Promise<void> {
    this.colorActual =
      this.colorActual === this.colorOscuro
        ? this.colorClaro
        : this.colorOscuro;

    await this.storage.set('theme', this.colorActual);
  }

  async loadStorageData(){
    // 1. Cargar el tema
    const savedTheme = await this.storage.get('theme');
    if (savedTheme) {
      this.colorActual = savedTheme;
    }

    // 2. Cargar si ya vio la intro (usando la llave que pusimos en intro.page.ts)
    const visto = await this.storage.get('introVisto');
    this.introYaVista = visto === true;
    
    if (this.introYaVista) {
      console.log("El usuario ya visitó la intro anteriormente");
    }
  }

  irAIntro(){
    this.router.navigateByUrl('/intro');
  }
}