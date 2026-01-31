import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
import { storage } from './services/storage'; // Asegúrate de que la ruta sea correcta

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true, // Manteniendo el estándar standalone
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  
  constructor(private storageService: storage) {}

  async ngOnInit() {
    // Revisamos si el usuario guardó su preferencia previamente
    const darkMode = await this.storageService.get('darkMode');
    
    if (darkMode) {
      // Si el valor en storage es true, aplicamos la clase al body
      document.body.classList.add('dark');
    } else if (darkMode === null) {
      // OPCIONAL: Si es la primera vez que abre la app, 
      // podemos revisar si el sistema operativo ya está en modo oscuro
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      if (prefersDark.matches) {
        document.body.classList.add('dark');
      }
    }
  }
}