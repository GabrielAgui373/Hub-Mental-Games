export type MathTrickType = 
  | 'multiply11'       // Multiplicar por 11 (2 e 3 dígitos)
  | 'sameFirstEnd5'    // Mesma dezena terminando em 5
  | 'sumTenUnits';     // Mesma dezena e unidades somam 10


export interface MathTricksConfig {
  timeLimit: number;        
  enabledTricks: MathTrickType[];
}

export interface MathQuestionHistory {
  question: string;     
  userAnswer: number;    
  correctAnswer: number;
  isCorrect: boolean;   
  trickUsed: MathTrickType; 
}

export interface MathTricksResult {
  totalQuestions: number;   
  correctAnswers: number; 
  wrongAnswers: number;   
  accuracy: number;  
  history: MathQuestionHistory[]; 
}