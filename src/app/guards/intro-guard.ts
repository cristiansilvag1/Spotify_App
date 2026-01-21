import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { storage } from '../services/storage'; 

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(
    private storage: storage, 
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    
    const introVisto = await this.storage.get('introVisto');

    
    if (introVisto === true) {
      
      return true;
    } else {
      
      this.router.navigateByUrl('/intro');
      return false; 
    }
  }
}