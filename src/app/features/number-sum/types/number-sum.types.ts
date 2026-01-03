export interface NumberSumConfig {
  interval: number | null; 
  digits: number | null;   
  amount: number | null; 
}

export interface NumberSumResult {
  correctSum: number;    
  userAnswer: number;    
  isCorrect: boolean;  
  numbersShown: number[]; 
}