import { defineStore } from "pinia";
import { gameActions } from "../stores/game.actions";
import { TGameState } from "@/models/store.game";

export const useGameStore = defineStore({
  id: "game",
  state: (): TGameState => ({
    gameId: null,
    playerData: {
      playerId: null,
      playerName: "",
      activeSlot: null,
      answerCount: null,
      isWinner: false,
      question: null,
      answer1: null,
      answer2: null,
      answer3: null,
    },
    questions: [],
    questionsCount: 0,
    questionsLoaded: false,
  }),
  persist: {
    key: "gameStore",
    storage: window.sessionStorage,
    // paths: ["playerData", "questions", "questionsCount"],
    // overwrite: true,
    beforeRestore: (context) => {
      // console.log("Before hydration...");
    },
    afterRestore: (context) => {
      // console.log("After hydration...");
    },
  },
  actions: gameActions,
});
