import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-end',
  standalone: true,
  imports: [CardModule,ButtonModule],
  templateUrl: './end.component.html',
  styleUrl: './end.component.css'
})
export class EndComponent implements OnInit{
  score = 0;
  congrats = '';
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  name = new FormControl();
  userRank = 1;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const scoreParam = params['score'];
      if (scoreParam) {
        this.score = Number(scoreParam);
      }
    });
    this.userRank = 1;
    this.congrats = 'Wow, you really learn a lot';
      
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
