import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor() {}

  loginUser(credentials: any){
return new Promise((accept, reject) => {
  if (credentials.email == "admin@gmail.com" && 
      credentials.password == "123456789") {
    accept('login correcto')
  } else {
    reject('login incorrecto')
  }
})
  } 
  registerUser(datos: any) {
  return new Promise((resolve, reject) => {
    // Simulamos una respuesta exitosa
    if (datos.email !== 'error@test.com') {
      resolve('accept');
    } else {
      reject('Este email ya está registrado o hubo un error.');
    }
  });
}
}
