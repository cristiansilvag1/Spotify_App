import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  async onLogin() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, rellena los campos correctamente.';
      return;
    }

    const credentials = this.loginForm.value;

    try {
      // 1. Intentamos con el servidor
      await this.authService.loginUser(credentials);
      
      // Si el servidor acepta las credenciales
      this.errorMessage = '';
      await this.storageService.set('isLoggedIn', true);
      this.navCtrl.navigateForward('/intro');

    } catch (error: any) {
      // 2. PLAN B: Si el servidor falla o da error de conexión
      console.warn('Validando credenciales con Storage local...');
      
      const localUser = await this.storageService.get('user_data');

      // Verificamos si los datos coinciden con lo guardado en el Registro
      if (localUser && localUser.email === credentials.email && localUser.password === credentials.password) {
        this.errorMessage = '';
        await this.storageService.set('isLoggedIn', true);
        this.navCtrl.navigateForward('/intro');
      } else {
        // Si no hay internet Y los datos están mal
        this.errorMessage = "Email o contraseña incorrectos.";
      }
    }
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}