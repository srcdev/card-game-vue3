import { createI18n } from "vue-i18n";

const i18n = createI18n<false>({
  legacy: false,
  // useScope: "global",
  locale: "en-GB",
});

export default i18n;
