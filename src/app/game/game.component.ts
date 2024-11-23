import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CardModule,ProgressBarModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

}
