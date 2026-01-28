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

  // ESTO ES LO QUE FALTABA PARA EL HTML
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

    this.authService.loginUser(this.loginForm.value)
      .then(async (res) => {
        this.errorMessage = '';
        await this.storageService.set('isLoggedIn', true);
        // Flujo: Login -> Intro
        this.navCtrl.navigateForward('/intro');
      })
      .catch(error => {
        this.errorMessage = "Credenciales incorrectas.";
      });
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}