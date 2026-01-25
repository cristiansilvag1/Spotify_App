import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { storage } from '../services/storage'; 

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(private storageService: storage, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const introVisto = await this.storageService.get('introVisto');

    if (introVisto === true) {
      return true;
    } else {
      this.router.navigateByUrl('/intro');
      return false; 
    }
  }
}