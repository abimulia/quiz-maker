import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { LocalStorageService } from '../shared/local-storage.service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-highscores',
  standalone: true,
  imports: [CommonModule, ButtonModule,CardModule],
  templateUrl: './highscores.component.html',
  styleUrl: './highscores.component.css'
})
export class HighscoresComponent implements OnInit{
  router = inject(Router);
  highScores: { score: number; name: string }[] = [];
  private storageKey = 'highScores';

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    const highScoresData = this.localStorageService.get(this.storageKey);
    this.highScores = highScoresData ? JSON.parse(highScoresData) : [];
  }

  playGame() {
    this.router.navigate(['game']);
  }

  goHome() {
    this.router.navigate(['']);
  }

}
