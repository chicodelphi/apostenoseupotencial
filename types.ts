
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  passed: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  category: string;
  entryFee: number;
  prizePool: number;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Polímata';
  mitCourseId: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  time: string;
  prize: string;
  status: 'Verificado' | 'Pendente' | 'Desclassificado';
}

export enum AppState {
  LANDING,
  DASHBOARD,
  QUIZ,
  RESULTS,
  ADMIN,
  PLAN,
  LOGIN,
  REGISTER
}
