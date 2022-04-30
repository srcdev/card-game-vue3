import { defineStore } from "pinia";
import { rootActions } from "../stores/root.actions";

const localesList = [
  {
    id: "en-GB",
    label: "English",
    value: "en-GB",
  },
  {
    id: "en-US",
    label: "USA",
    value: "en-US",
  },
  {
    id: "es-ES",
    label: "Spanish",
    value: "es-ES",
  },
];

export const useRootStore = defineStore({
  id: "root",
  state: () => ({
    currentView: "gameDeck",
    localesList: localesList,
    locale: "en-GB",
    validatorLocale: "en-GB",
    overlayOpen: false,
  }),
  persist: {
    key: "rootStore",
    storage: window.sessionStorage,
    // paths: ["locale", "validatorLocale"],
    overwrite: true,
    beforeRestore: (context) => {
      // console.log("Before hydration...");
    },
    afterRestore: (context) => {
      // console.log("After hydration...");
    },
  },
  actions: rootActions,
});
