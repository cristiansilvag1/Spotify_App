import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { storage } from '../services/storage'; 

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IntroPage implements OnInit {

  // TUS 4 SLIDES ORIGINALES RESTAURADOS
  slides = [
    {
      title: 'Tu música, a tu manera',
      description: 'Descubre millones de canciones y artistas en un solo lugar.',
      image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop',
      class: 'slide-1' 
    },
    {
      title: 'Listas personalizadas',
      description: 'Creamos playlists basadas en tus gustos musicales.',
      image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=500&auto=format&fit=crop',
      class: 'slide-2'
    },
    {
      title: 'Sin conexión',
      description: 'Lleva tu música favorita donde quieras, sin necesidad de internet.',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=500&auto=format&fit=crop',
      class: 'slide-3'
    },
    {
      title: 'Calidad Premium',
      description: 'Disfruta del mejor sonido de alta fidelidad disponible.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop',
      class: 'slide-4'
    }
  ];

  constructor(private navCtrl: NavController, private storageService: storage) { }

  ngOnInit() {}

  async goBack() {
    // Guardamos para que el Guard sepa que ya vimos la intro
    await this.storageService.set('isIntroShowed', true);
    
    // Navegamos a la ruta completa del menú
    this.navCtrl.navigateRoot('/menu/home');
  }
}