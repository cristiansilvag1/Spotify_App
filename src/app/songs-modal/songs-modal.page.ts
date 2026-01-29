import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class SongsModalPage implements OnInit {
  
  // Estos @Input() reciben los datos (props) que enviamos desde el Home
  @Input() artistName: string = '';
  @Input() songs: any[] = [];

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    console.log('Canciones recibidas en el modal:', this.songs);
  }

  // Función para cerrar el modal
  dismiss() {
    this.modalController.dismiss();
  }

  // Función opcional para reproducir (puedes conectarla a un servicio de audio luego)
  playSong(song: any) {
    console.log('Reproduciendo:', song.name);
  }
}