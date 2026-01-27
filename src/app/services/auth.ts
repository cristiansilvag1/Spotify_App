import { Injectable } from '@angular/core';
import { storage } from './storage'; // Importamos tu servicio de storage

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
  // Inyectamos el storage para poder leer los datos guardados
  constructor(private storageService: storage) {}

  async loginUser(credentials: any) {
    // 1. Buscamos los datos del usuario que se registró
    const userRegistrado = await this.storageService.get('user_data');

    return new Promise((accept, reject) => {
      // 2. Comparamos lo que el usuario escribió con lo que está en el storage
      if (
        userRegistrado && 
        credentials.email === userRegistrado.email && 
        credentials.password === userRegistrado.password
      ) {
        accept('login correcto');
      } 
      // Mantenemos al administrador por si acaso
      else if (credentials.email === "admin@gmail.com" && credentials.password === "123456789") {
        accept('login correcto');
      }
      else {
        reject('login incorrecto');
      }
    });
  }

  registerUser(userData: any) {
    return new Promise(async (resolve, reject) => {
      try {
        // Guardamos los datos en el storage para que el login los pueda leer luego
        await this.storageService.set('user_data', userData);
        resolve('accept');
      } catch (error) {
        reject('Error al guardar los datos');
      }
    });
  }
}