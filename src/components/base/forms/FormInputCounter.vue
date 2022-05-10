<template>
  <p
    class="input-counter textBodyHint"
    v-t="{
      path: 'counterNofMax',
      args: {
        count: inputCurrentCount,
        max: inputMaxLength,
      },
    }"
    :data-testid="`${dataTestid}-${inputTestid}-Counter`"
  ></p>
</template>

<script type="ts">

import { translations } from "./locales";
import setI18n from "@/composables/setI18n";

export default {
  name: "FormInputCounter",
  props: {
		dataTestid: {
			type: String,
			default: ''
		},
		inputTestid: {
			type: String,
			default: ''
		},
    inputCurrentCount: {
      type: Number,
      default: 0,
    },
    inputMinLength: {
      type: Number,
      default: 0,
    },
    inputMaxLength: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    let { t } = setI18n(translations);
    return {
      t
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/imports.scss";

.input-counter {
  color: $input-border-valid-dark;
  white-space: nowrap;
}
</style>
