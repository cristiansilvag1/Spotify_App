import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Auth } from '../services/auth';
// 1. IMPORTANTE: Importar tu servicio de storage personalizado
import { storage } from '../services/storage'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string = '';

  validationMessages = {
    email: [
      { type: 'required', message: 'El email es obligatorio.' },
      { type: 'email', message: 'Ingresa un correo válido.' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'Debe tener al menos 6 caracteres.' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: Auth,
    private navCtrl: NavController,
    // 2. INYECTAR tu servicio de storage
    private storageService: storage 
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials = this.loginForm.value;
    console.log("Intentando login con:", credentials);

    this.authService.loginUser(credentials)
      .then(async (res) => {
        this.errorMessage = '';

        await this.storageService.set('isLoggedIn', true);

        console.log("Sesión guardada correctamente. Navegando al Home...");
        this.navCtrl.navigateForward('/home');
      })
      .catch(error => {
        
        this.errorMessage = "Credenciales incorrectas. Inténtalo de nuevo.";
        console.error("Error en login:", error);
      });
  }
 goToRegister() {
  this.navCtrl.navigateForward('/register');
}
}