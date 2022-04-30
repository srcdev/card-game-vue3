import { useRootStore } from "@/stores/root";
import { useI18n } from "vue-i18n";
import { computed, watch } from "vue";

export default function setI18n(translations: any) {
  type MessageSchema = typeof translations;
  const { t, locale } = useI18n<
    false,
    {
      messages: MessageSchema;
    }
  >({
    messages: translations,
  });

  const rootStore = useRootStore();
  const selectedLocaleStore = computed(() => rootStore.locale);
  locale.value = selectedLocaleStore.value;

  watch(selectedLocaleStore, (currentValue: any) => {
    locale.value = currentValue;
  });

  return {
    t,
  };
}
