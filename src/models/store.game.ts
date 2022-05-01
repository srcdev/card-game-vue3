export type TAnswer = {
  id: string;
  text: string;
};
export type TQuestion = {
  id?: string | undefined;
  text: string;
};

export type TPlayerState = {
  playerId?: string | null;
  playerName?: string | null;
  activeSlot?: number | null;
  answerCount?: number | null;
  isWinner?: boolean | null;
  question?: TQuestion | null;
  answer1?: TAnswer | null;
  answer2?: TAnswer | null;
  answer3?: TAnswer | null;
};

export interface IQuestionsList {
  playerId: string;
  playerName: string;
  activeSlot: number;
  answerCount: number;
  isWinner: boolean;
  question: TQuestion;
  answer1: TAnswer;
  answer2: TAnswer;
  answer3: TAnswer;
}

export type TGameState = {
  gameId?: string | null;
  playerData?: TPlayerState;
  questions?: IQuestionsList[];
  questionsCount: number;
  questionsLoaded: boolean;
};

export interface IGameQuestionsDTO {
  data: IQuestionsList[];
  status: number;
  statusText: string;
}
