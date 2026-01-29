import { Injectable } from '@angular/core';
import { storage } from './storage';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  // Ajusta esta URL a la IP o dominio de tu servidor
  // Ejemplo: 'http://192.168.1.10:3000'
  baseUrl = 'https://tu-servidor-api.com'; 

  constructor(private storageService: storage) {}

  async loginUser(credentials: any) {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (response.ok) {
        const data = await response.json();
        // Guardamos los datos del usuario o token que devuelva el servidor
        await this.storageService.set('user_data', data.user || data);
        return Promise.resolve('login correcto');
      } else {
        return Promise.reject('Credenciales incorrectas');
      }
    } catch (error) {
      console.error("Error en login:", error);
      return Promise.reject('Error de conexión con el servidor');
    }
  }

  async registerUser(userData: any) {
    try {
      const response = await fetch(`${this.baseUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        return Promise.resolve('Usuario registrado con éxito');
      } else {
        const errorData = await response.json();
        return Promise.reject(errorData.message || 'Error al registrar');
      }
    } catch (error) {
      console.error("Error en registro:", error);
      return Promise.reject('Error de conexión con el servidor');
    }
  }
}