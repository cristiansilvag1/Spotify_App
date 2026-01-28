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

  // Mantenemos solo lo necesario para el contenido
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
      image: "https://scontent.fbaq10-1.fna.fbcdn.net/v/t39.30808-6/459222114_1071373301658506_7559999489536611835_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEYFLS9ZcO8PsmcBozS1jOiF2q90geR0VwXar3SB5HRXAAkSC17YlkU75tewPPcZJI&_nc_ohc=xrGqVg63WK8Q7kNvwFnPR3V&_nc_oc=AdmPrVe0bkKpFC8zEUDbvKG-qn8b2mFw8gEI-9zNoENwCEG17hyF0MrfXAtKnU8eVm0&_nc_zt=23&_nc_ht=scontent.fbaq10-1.fna&_nc_gid=uVwQRsD5uOS72s4bNv-FzQ&oh=00_AfoJtwflbMZxgUTwuGPF7ChPlPu7q4wNyV3r8tRMuy_d-w&oe=697DF54E", 
      description: "Ritmos africanos con influencias del reggae, el dancehall y la música afrocaribeña."
    }
  ];

  constructor(private storage: storage, private router: Router) {}

  async ngOnInit() {
    await this.checkIntroStatus();
    this.simularCargaDatos();
  }

  async ionViewWillEnter() {
    await this.checkIntroStatus();
  }

  // Solo revisamos si ya vio la intro
  async checkIntroStatus(){
    const visto = await this.storage.get('isIntroShowed'); // Usamos la llave que definimos en el Guard
    this.introYaVista = visto === true;
  }

  async simularCargaDatos() {
    const data = await this.obtenerDatosSimulados();
    console.log("Datos simulados cargados:", data);
  }

  obtenerDatosSimulados() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(["classic music", "afrobeats", "rock & roll", "champeta"])
      }, 2000)
    })
  }

  irAIntro(){
    this.router.navigateByUrl('/intro');
  }
}