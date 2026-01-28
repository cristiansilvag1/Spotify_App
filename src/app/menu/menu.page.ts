import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { storage } from '../services/storage';
import { addIcons } from 'ionicons';
import { homeOutline, logOutOutline, arrowBackOutline, moon, sunny } from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MenuPage implements OnInit {
  public isMenuOpen = false;
  public isDarkMode = true;

  constructor(private navCtrl: NavController, private storageService: storage) {
    addIcons({ homeOutline, logOutOutline, arrowBackOutline, moon, sunny });
  }

  async ngOnInit() {
    const savedTheme = await this.storageService.get('theme');
    this.isDarkMode = savedTheme === null ? true : savedTheme === 'dark';
    this.applyTheme();
  }

  onMenuOpen() { this.isMenuOpen = true; }
  onMenuClose() { this.isMenuOpen = false; }

  async toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    await this.storageService.set('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme() {
    const root = document.documentElement;
    if (this.isDarkMode) {
      document.body.classList.add('dark');
      root.style.setProperty('--ion-background-color', '#121212');
      root.style.setProperty('--ion-text-color', '#ffffff');
      root.style.setProperty('--ion-item-background', '#121212');
    } else {
      document.body.classList.remove('dark');
      root.style.setProperty('--ion-background-color', '#ffffff');
      root.style.setProperty('--ion-text-color', '#000000');
      root.style.setProperty('--ion-item-background', '#ffffff');
    }
  }

  async logout() {
    await this.storageService.set('isLoggedIn', false);
    this.navCtrl.navigateRoot('/login');
  }
}