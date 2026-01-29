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

  // Mensajes de validación para la interfaz
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
        // Llamada al servicio que conecta con el servidor (/register)
        await this.authService.registerUser(datosUsuario);
        
        // Si el servidor responde con éxito, limpiamos error y volvemos al login
        this.errorMessage = '';
        
        // Guardamos una copia local por respaldo
        await this.storageService.set('user_data', datosUsuario);
        
        // Redirigimos al Login para que el usuario inicie sesión formalmente
        this.navCtrl.navigateBack('/login'); 

      } catch (error: any) {
        // Captura el mensaje de error definido en el AuthService (reject)
        this.errorMessage = error; 
      }
    } else {
      this.errorMessage = 'Por favor, completa el formulario correctamente.';
    }
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}