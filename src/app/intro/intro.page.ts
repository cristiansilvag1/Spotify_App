import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'; // Asegúrate de que el nombre del servicio coincida con tu provider

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IntroPage implements OnInit {

  constructor(private router: Router, private storage: Storage) { }

  async ngOnInit() {
    // Es buena práctica inicializar el storage si no usas un servicio intermedio
    await this.storage.create();
  }

  async goBack() {
    console.log("Guardando estado y volviendo al home...");

    try {
      // Guarda en Storage que ya vio el intro
      await this.storage.set('introVisto', true);
      
      // Navegar al Home
      this.router.navigateByUrl("/home");
    } catch (error) {
      console.error("Error al guardar en storage:", error);
      // Navegamos de todos modos para no bloquear al usuario
      this.router.navigateByUrl("/home");
    }
  }
}