import GameServices from "@/services/service.game";
import { IGameQuestionsDTO } from "@/models/store.game";

export const gameActions = {
  updateQuestions(this: any, payload: IGameQuestionsDTO) {
    Object.assign(this.questions, payload.data);
    this.questionsCount = Object.keys(payload.data).length;
    this.questionsLoaded = this.questionsCount > 0;
  },
  async getQuestions(this: any) {
    try {
      const response = await GameServices.getQuestions();

      if (response.status === 200) {
        Object.assign(this.questions, response.data);
        this.questionsCount = Object.keys(response.data).length;
        this.questionsLoaded = this.questionsCount > 0;
      }
      console.log(`gameActions.getQuestions --> "${this.questionsCount}"`);
    } catch (err) {
      console.error(`Error fetching questions: ${err}`);
    }
  },
};
