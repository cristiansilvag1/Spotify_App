import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  // Colores de tema
  colorClaro = 'var(--color-claro)';
  colorOscuro = 'var(--color-oscuro)'; 
  colorActual = this.colorOscuro;

  // Géneros musicales
  genres = [
    {
      title: "Music Classic",
      image: "https://static.vecteezy.com/system/resources/previews/003/335/968/large_2x/the-violin-on-table-classic-musical-instrument-used-in-the-orchestra-free-photo.jpg",
      
    },
    {
      title: "Afrobeats",
      image: "https://static.vecteezy.com/system/resources/previews/002/236/321/large_2x/electric-guitar-instrument-musical-isolated-icon-free-vector.jpg",
      description: "Los mejores temas de Afrobeats están aquí, con ritmos que te harán mover el cuerpo y sentir la energía de cada canción."
    },
    {
      title: "Rock & Roll",
      image: "https://static.vecteezy.com/system/resources/previews/002/236/315/large_2x/saxophone-instrument-musical-isolated-icon-free-vector.jpg",
      description: "Siente la energía de los clásicos del Rock & Roll, con guitarras eléctricas, baterías potentes y letras que marcaron generaciones."
    }
  ];

  constructor() {}

  // Cambiar tema claro/oscuro
  cambiarColor() {
    this.colorActual = (this.colorActual === this.colorOscuro) ? this.colorClaro : this.colorOscuro;
  }
}
