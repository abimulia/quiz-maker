export interface Quiz {
}

export interface FormattedQuestion {
    question: string;
    choice1: string;
    choice2: string;
    choice3: string;
    choice4: string;
    answer: number;
}

export interface Question {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: Array<string>;
}

