import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { LocalStorageService } from '../shared/local-storage.service';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-end',
  standalone: true,
  imports: [CardModule,ButtonModule,ReactiveFormsModule,InputTextModule ],
  templateUrl: './end.component.html',
  styleUrl: './end.component.css'
})
export class EndComponent implements OnInit{
  score = 0;
  congrats = '';
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  name = new FormControl();
  highScores: { score: number; name: string }[] = [];
  private storageKey = 'highScores';
  userRank = 1;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    const highScoresData = this.localStorageService.get(this.storageKey);
    this.highScores = highScoresData ? JSON.parse(highScoresData) : [];
    this.activatedRoute.queryParams.subscribe((params) => {
      const scoreParam = params['score'];
      if (scoreParam) {
        this.score = Number(scoreParam);
      }
    });
    const highscore = {
      score: this.score,
      name: "checkRankingScore",
    };
    const checkRankArrays = [...this.highScores];
    checkRankArrays.push(highscore);
    checkRankArrays.sort((a: any, b: any) => b.score - a.score);
    const userRanking = checkRankArrays.indexOf(highscore);
    this.userRank = userRanking + 1;
    switch (true) {
      case this.userRank > 10:
        this.congrats = 'No worries, just add more reading :-)';
        break;
      case this.userRank <= 10 && this.userRank > 7:
        this.congrats = 'Good, great progress';
        break;
      case this.userRank <= 7 && this.userRank > 4:
        this.congrats = 'Wow, you really learn a lot';
        break;
      case this.userRank <= 4 && this.userRank > 1:
        this.congrats = 'Excelent, almost nailed';
        break;
        break;
      case this.userRank == 1:
        this.congrats = 'Amazing, you are number one!';
        break;
      default:
        break;
    }
      
  }

  submitScore() {
    const highscore = {
      score: this.score,
      name: this.name.value,
    };
    this.highScores.push(highscore);
    this.highScores.sort((a: any, b: any) => b.score - a.score);
    this.highScores.splice(10);
    this.localStorageService.set(this.storageKey, JSON.stringify(this.highScores));
    this.router.navigate(['highscore']);
  }

  playGame() {
    this.router.navigate(['game']);
    this.score = 0;
  }

  goHome() {
    this.router.navigate(['']);
    this.score = 0;
  }

}
