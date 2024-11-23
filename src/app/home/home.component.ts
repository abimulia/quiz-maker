import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  title = 'Home';
  router = inject(Router);

  playGame(){
    this.router.navigate(['game']);
  }

  highscore(){
    this.router.navigate(['highscore']);
  }
}
