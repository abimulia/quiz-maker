import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';

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
    }
];
