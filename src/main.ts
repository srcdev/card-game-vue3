import { createApp } from "vue";
import App from "@/App.vue";
import camelize from "@/helpers/camelize";
import { createI18n } from "vue-i18n";
import message from "@/locales/index";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

import "@/assets/styles/main.scss";

const i18n = createI18n({
  locale: "en-GB",
  fallbackLocale: "en-GB",
  messages: message,
});

createApp(App).use(i18n).use(pinia).mount("#game-app");
