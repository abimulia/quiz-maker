import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Question } from '../model/quiz';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
  // private apiUrl = "./assets/questions.json";

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => 
        response.results as Question[]) // Cast results to Question[]
    );
  }
}
