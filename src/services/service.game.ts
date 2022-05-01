import HttpClient from "@/composables/useHttpClient";
import { IGameQuestionsDTO } from "@/models/store.game";
class GameServices {
  async getQuestions() {
    const apiResponse = await HttpClient.get<IGameQuestionsDTO>("/api/questions");
    return apiResponse;
  }
}

export default new GameServices();
