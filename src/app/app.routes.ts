import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { EndComponent } from './end/end.component';
import { HighscoresComponent } from './highscores/highscores.component';

export const routes: Routes = [
    { 
        path: '', 
        component: HomeComponent, 
        title: 'Home Page'
    },
    { 
        path: 'game', 
        component: GameComponent,
        title: 'Play Game'
    },
    { 
        path: 'end', 
        component: EndComponent,
        title: 'Game Ende'
    },
    { 
        path: 'highscore', 
        component: HighscoresComponent,
        title: 'Highscores'
    },
];
