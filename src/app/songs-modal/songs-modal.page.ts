import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SongsModalPage implements OnInit, OnDestroy {
  @Input() artistName: string = '';
  @Input() songs: any[] = [];

  audio: HTMLAudioElement = new Audio();
  currentSong: any;
  isPlaying: boolean = false;
  progress: number = 0;
  duration: number = 0;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    if (this.songs.length > 0) {
      this.currentSong = this.songs[0];
      this.prepareAudio(this.currentSong);
    }
  }

  ngOnDestroy() {
    this.audio.pause();
    this.audio.src = '';
  }

  prepareAudio(song: any) {
    this.audio.src = song.preview || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    this.audio.load();
    this.audio.onloadedmetadata = () => this.duration = Math.floor(this.audio.duration);
    this.audio.ontimeupdate = () => this.progress = Math.floor(this.audio.currentTime);
    this.audio.onended = () => this.next();
  }

  togglePlay() {
    this.isPlaying ? this.audio.pause() : this.audio.play();
    this.isPlaying = !this.isPlaying;
  }

  playSong(song: any) {
    this.currentSong = song;
    this.prepareAudio(song);
    this.audio.play();
    this.isPlaying = true;
  }

  next() {
    const index = this.songs.indexOf(this.currentSong);
    if (index < this.songs.length - 1) this.playSong(this.songs[index + 1]);
  }

  previous() {
    const index = this.songs.indexOf(this.currentSong);
    if (index > 0) this.playSong(this.songs[index - 1]);
  }

  seek(event: any) {
    this.audio.currentTime = event.detail.value;
  }

  formatTime(seconds: number) {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  dismiss() {
    this.audio.pause();
    this.modalController.dismiss({ selectedSong: this.currentSong });
  }
}