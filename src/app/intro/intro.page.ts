import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

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
    // Inicializa Storage
    await this.storage.create();

    // Verifica si ya vio el intro
    const introVisto = await this.storage.get('introVisto');
    if (introVisto) {
      // Si ya lo vio, redirige directo al Home
      this.router.navigateByUrl('/home');
    }
  }

  async goBack() {
    console.log("volver");

    // Guardar en Storage que ya vio el intro
    await this.storage.set('introVisto', true);

    // Navegar al Home
    this.router.navigateByUrl("/home");
  }
}
