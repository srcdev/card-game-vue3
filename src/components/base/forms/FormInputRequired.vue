<template>
  <span
    v-if="inputRequired"
    :data-testid="`${dataTestid}-${inputTestid}-Required`"
    :class="{ 'access-hidden': !displayRequiredText }"
  >
    &nbsp;{{ t("requiredText") }}</span
  >
  <span
    v-else
    :data-testid="`${dataTestid}-${inputTestid}-Optional`"
    :class="{ 'access-hidden': !displayRequiredText }"
  >
    &nbsp;{{ t("optionalText") }}</span
  >
</template>

<script type="ts">

import { translations } from "./locales";
import setI18n from "@/composables/setI18n";

export default {
  name: "InputRequired",
  props: {
		dataTestid: {
			type: String,
			default: ''
		},
		inputTestid: {
			type: String,
			default: ''
		},
    inputRequired: {
      type: Boolean,
      default: false,
    },
    displayRequiredText: {
      type: Boolean,
      default: false,
    }
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
// @import "@/assets/styles/global";
// .form-row-inner {
//     .form-row-required {
//         display: inline-block;
//         height: 20px;
//         margin-left: 5px;
//         overflow: hidden;
//         sup {
//             color: $formFontErrorColourLight;
//             font-size: 20px;
//             font-weight: bold;
//             top: 2px;
//         }
//     }
// }
</style>
