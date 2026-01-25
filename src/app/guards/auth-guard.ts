import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { storage } from '../services/storage'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storageService: storage, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.storageService.get('isLoggedIn');

    if (isLoggedIn === true) {
      return true; 
    } else {
      this.router.navigateByUrl('/login'); 
      return false;
    }
  }
}