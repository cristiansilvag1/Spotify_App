import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { storage } from '../services/storage';
import { Auth } from '../services/auth'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';

  validationMessages = {
    nombre: [{ type: 'required', message: 'El nombre es obligatorio.' }],
    apellido: [{ type: 'required', message: 'El apellido es obligatorio.' }],
    email: [
      { type: 'required', message: 'El email es obligatorio.' },
      { type: 'email', message: 'Formato de email incorrecto.' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'Mínimo 6 caracteres.' }
    ]
  };

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private storageService: storage,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onRegister() {
    if (this.registerForm.valid) {
      const datosUsuario = this.registerForm.value;

      try {
        // 1. Intentamos con el servidor
        await this.authService.registerUser(datosUsuario);
        
        // Si el servidor responde, guardamos copia local y vamos al login
        await this.storageService.set('user_data', datosUsuario);
        this.errorMessage = '';
        this.navCtrl.navigateBack('/login'); 

      } catch (error: any) {
        // 2. PLAN B: Si el servidor falla (error de conexión)
        console.warn('Servidor no disponible, usando registro local...');
        
        // Guardamos los datos en Storage de todos modos
        await this.storageService.set('user_data', datosUsuario);
        
        // Limpiamos error y redirigimos
        this.errorMessage = '';
        this.navCtrl.navigateBack('/login'); 
      }
    } else {
      this.errorMessage = 'Por favor, completa el formulario correctamente.';
    }
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}