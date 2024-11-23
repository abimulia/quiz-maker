import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormattedQuestion, Question } from './model/quiz';
import { GameService } from './service/game.service';
import { decode } from 'html-entities';
import { Router } from '@angular/router';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CardModule,ProgressBarModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit{
  questions: Question[] = [];
  formattedQuestions: FormattedQuestion[] = [];
  currentQuestion: FormattedQuestion | undefined;
  loadingQuestion = false;
  CORRECT_BONUS = 10;
  MAX_QUESTIONS = 5;
  score = 0;
  questionCounter = 0;
  progressText = "";
  progressBar = 0;
  classToApply = "";
  router = inject(Router);

  constructor(private gameService: GameService){}

  
  ngOnInit(): void {
      this.loadingQuestion = true;
      this.getQuestions();
      setTimeout(() => {
        this.loadingQuestion = false;
        this.getNewQuestion();
      }, 500);
  }

  startGame(){
    this.questionCounter = 0;
    this.score = 0;

  }

  getQuestions(){
    this.gameService.getQuestions().subscribe((data) => {
      this.questions = data;
      this.questions.map((question)=>{
        const formattedQuestion = this.convertQuestionToFormattedQuestion(question);
        this.formattedQuestions.push(formattedQuestion);
      })
    })
  }

  getNewQuestion(){
    if(this.formattedQuestions.length === 0 || this.questionCounter >= this.MAX_QUESTIONS){
      this.router.navigate(['end'],{queryParams:{score: this.score}});
    }
    this.questionCounter++;
    this.progressText = "Question "+ this.questionCounter + " / " + this.MAX_QUESTIONS;
    this.progressBar = (this.questionCounter/this.MAX_QUESTIONS)*100;
    const questionIndex = Math.floor(Math.random() * this.formattedQuestions.length);
    this.currentQuestion = this.formattedQuestions[questionIndex];
    this.formattedQuestions.splice(questionIndex,1);
  }

  submitAnswer(selectedChoice: number){
    console.log("selectedChoice: " + selectedChoice);
    if(selectedChoice == this.currentQuestion?.answer){
      this.score += this.CORRECT_BONUS;
      this.classToApply = "correct";
    } else {
      this.classToApply = "incorrect";
    }
    setTimeout(() => {
      this.classToApply = "";
      this.getNewQuestion();
    }, 500);

  }

  private convertQuestionToFormattedQuestion(
    questionObj: Question
  ): FormattedQuestion {
    const choices = [
      questionObj.correct_answer,
      ...questionObj.incorrect_answers,
    ];


    const shuffledChoices = this.shuffleArray(choices);
    return {
      question: decode(questionObj.question),
      choice2: decode(shuffledChoices[1]),
      choice3: decode(shuffledChoices[2]),
      choice4: decode(shuffledChoices[3]),
      choice1: decode(shuffledChoices[0]),
      answer: shuffledChoices.indexOf(questionObj.correct_answer) + 1,
    };

    
  }

  private shuffleArray(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }

  

}
