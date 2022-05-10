<template>
  <div class="field" :class="[{ error: inputHasErrors }, { active: inputIsActive }, { accessfocus: inputIsActive }]">
    <input
      :type="inputType"
      class="is-checkradio"
      :class="[{ error: inputHasErrors }, { active: inputIsActive }, { accessfocus: inputIsActive }]"
      :aria-labelledby="inputName"
      :id="inputName"
      :name="inputName"
      :required="inputRequired"
      @focus="setActiveFieldState($event)"
      @focusout="setBlurFieldState($event)"
      @change="$emit('update:modelValue', inputValue)"
      :checked="inputValue === modelValue"
      :value="modelValue"
      :disabled="inputDisabled"
      :aria-disabled="inputDisabled"
      :data-testid="`${dataTestid}-${inputTestid}-Input`"
    />
    <label class="label v-align-mid" :class="[{ error: inputHasErrors }, { active: inputIsActive }, { accessfocus: inputIsActive }]" :for="inputName">
      <span v-if="inputLabelWithLink" :data-testid="`${dataTestid}-${inputTestid}-Label`" v-html="inputLabelWithHrefI18n"></span>

      <span v-else :data-testid="`${dataTestid}-${inputTestid}-Label`" v-html="inputLabel"></span>
      <FormInputRequired :input-required="inputRequired" :input-testid="inputTestid" :data-testid="dataTestid" />
    </label>
    <p v-if="inputHasErrors" class="error-message detached" :data-testid="`${dataTestid}-${inputTestid}-Error`">
      {{ inputErrorPattern }}
    </p>
  </div>
</template>

<script type="ts">

import { defineComponent } from "vue";
import FormInputRequired from './FormInputRequired.vue';

export default defineComponent({
	name: 'FormInputCheckboxOrRadio',
	components: {
		FormInputRequired
	},
	props: {
		dataTestid: {
			type: String,
			default: ''
		},
    inputOptions: {
      type: Array,
      default: () => []
    },
		inputType: {
			type: String,
			default: null
		},
		inputTestid: {
			type: String,
			default: null
		},
		inputName: {
			type: String,
			default: null
		},
		inputLabel: {
			type: String,
			default: null
		},
		inputLabelWithLink: {
			type: Object,
			default: () => {}
		},
		inputHasErrors: {
			type: Boolean,
			default: false
		},
		inputErrorPattern: {
			type: String,
			default: null
		},
		inputRequired: {
			type: Boolean,
			default: false
		},
		submitAttempted: {
			type: Boolean,
			default: false
		},
		modelValue: {
			type: [Boolean, String],
			default: ''
		},
		inputValue: {
			type: String,
			default: ''
		},
		value: {
			type: String,
			default: ''
		},
		inputDisabled: {
			type: Boolean,
			default: false
		}
	},
	data: function () {
		return {
			inputIsDirty: false,
			inputIsActive: false,
		}
	},
  computed: {
    labelHasLink() {
      return this.inputLabelWithLink !== undefined
    },
    inputLabelWithHrefI18n() {
      // This needs revisit to do it the correct i18n way.
      const link = `<a href="${this.inputLabelWithLink.href}" target="_blank">${this.inputLabelWithLink.link}</a>`;
      const labelText = this.inputLabelWithLink.label;
      return labelText.replace("[link]", link);
    }
  },
	mounted() {
		this.inputIsActive = true;
		this.setInputIsDirty();
	},
	watch: {
		submitAttempted() {
			this.setInputIsDirty();
		}
	},
	methods: {
    setInputIsDirty() {
      if (this.submitAttempted || !this.inputIsDirty && this.value.length > 0) {
        this.inputIsDirty = true;
      }
    },
    setActiveFieldState() {
      this.inputIsActive = true;
    },
    setBlurFieldState(event) {
      this.inputIsActive = false;
      this.inputIsDirty = false;
      const currentLength = event.target.value.length;
      if (currentLength === 0) {
        this.inputIsDirty = false;
      } else {
        this.inputIsDirty = true;
      }
    }
  }
});
</script>
<style lang="scss">
@import "@/assets/styles/imports.scss";

.is-checkradio[type="radio"],
.is-checkradio[type="checkbox"] {
  position: absolute;
  left: -9999px;

  & + label {
    padding-left: 2rem;
    position: relative;

    &:first-of-type {
      margin-left: 0;
    }

    span {
      white-space: break-spaces;
    }

    &::before,
    &::after {
      width: 1.5rem;
      height: 1.5rem;
      content: "";
      position: absolute;
    }

    &::before {
      border: 1px solid $inputBorderColour;
      left: 0;
      top: 0rem;
    }
    // &.v-align-mid {
    //   &::before {
    //     top: 25%;
    //   }
    // }
  }

  &.error {
    & + label {
      &::before {
        border-color: $inputBorderColourError;
      }
    }
  }

  &.valid {
    & + label {
      &::before {
        border-color: $inputBorderColourValid;
      }
    }
  }

  &:checked {
    & + label {
      &::after {
        display: inline-block;
      }
    }
  }
}

.is-checkradio {
  &:checked {
    & + label {
      &::before {
        border-color: $checkboxRadioCheckedColour;
      }
    }
  }
  &:focus {
    & + label {
      &::before {
        box-shadow: 0 0 0 1px $input-border-light;
      }
    }
  }
}

.is-checkradio[type="radio"] {
  & + label {
    &::before {
      border-radius: 50%;
    }
  }
  &:checked {
    & + label {
      &::after {
        border-radius: 50%;
        background: $checkboxRadioCheckedColour;
        left: 0;
        top: 0;
        transform: scale(0.7);
      }
    }
    &[disabled] {
      & + label {
        &::before {
          border-color: $inputBorderColour;
        }
        &::after {
          border-color: $inputBorderColour;
          background: $inputBorderColour;
        }
      }
    }
  }
}

.is-checkradio[type="checkbox"] {
  & + label {
    &::before {
      border-radius: 7px;
      height: 20px;
      width: 20px;
    }
  }
  &:checked {
    & + label {
      &::after {
        display: inline-block;
        box-sizing: border-box;
        transform: translateY(0rem) rotate(45deg);
        border: 2px solid $checkboxRadioCheckedColour;
        border-top: 0;
        border-left: 0;
        width: 5px;
        height: 11px;
        top: 4px;
        left: 8px;
      }
    }
    &[disabled] {
      & + label {
        &::before {
          border-color: $inputBorderColour;
        }
        &::after {
          border-color: $inputBorderColour;
        }
      }
    }
  }
}
</style>
