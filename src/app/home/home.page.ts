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
  colorClaro = 'var(--color-claro)';
  colorOscuro = 'var(--color-oscuro)'; 
  colorActual = this.colorOscuro;

  genres = [
    {
      title: "music clasic",
      image: "https://static.vecteezy.com/system/resources/previews/003/335/968/large_2x/the-violin-on-table-classic-musical-instrument-used-in-the-orchestra-free-photo.jpg",
      description: "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de bocetos para diseños para probar el arte visual antes de insertar el texto final."
    },
    {
      title: "Afrobeats",
      image: "https://static.vecteezy.com/system/resources/previews/002/236/321/large_2x/electric-guitar-instrument-musical-isolated-icon-free-vector.jpg",
      description: "Los mejores temas de afrobeats están aquí."
    },
    {
      title: "Rock & Roll",
      image: "https://static.vecteezy.com/system/resources/previews/002/236/315/large_2x/saxophone-instrument-musical-isolated-icon-free-vector.jpg",
      description: "Siente la energía de los mejores clásicos del rock."
    }
  ];

  constructor() {}

  cambiarColor() {
    this.colorActual = (this.colorActual === this.colorOscuro) ? this.colorClaro : this.colorOscuro;
  }
}