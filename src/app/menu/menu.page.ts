import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { storage } from '../services/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class MenuPage {
  constructor(private storageService: storage, private navCtrl: NavController) {}

  async logout() {
    await this.storageService.set('isLoggedIn', false);
    this.navCtrl.navigateRoot('/login');
  }
}