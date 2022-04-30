import { createApp } from "vue";
import App from "@/App.vue";
import camelize from "@/helpers/camelize";
import i18n from "@/createI18n";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

import "@/assets/styles/main.scss";

createApp(App).use(i18n).use(pinia).mount('#game-app');
