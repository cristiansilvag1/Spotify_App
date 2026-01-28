import { Injectable } from '@angular/core';
import { storage } from './storage';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private storageService: storage) {}

  async loginUser(credentials: any) {
    const user = await this.storageService.get('user_data');
    
    return new Promise((resolve, reject) => {
      if (
        (user && user.email === credentials.email && user.password === credentials.password) ||
        (credentials.email === "admin@gmail.com" && credentials.password === "123456789")
      ) {
        resolve('login correcto');
      } else {
        reject('error');
      }
    });
  }

  // ESTE ES EL MÉTODO QUE FALTABA:
  async registerUser(userData: any) {
    try {
      // Guardamos el objeto del usuario en el storage
      await this.storageService.set('user_data', userData);
      return Promise.resolve('Usuario registrado con éxito');
    } catch (error) {
      return Promise.reject('Error al registrar usuario');
    }
  }
}