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
}
