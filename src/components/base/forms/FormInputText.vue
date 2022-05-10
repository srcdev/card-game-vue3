<template>
  <div class="field block" :class="[{ error: inputHasErrors }, { active: inputIsActive }, { accessfocus: inputIsActive }]">
    <div class="label-wrapper" :class="[{ 'counter-only': inputHint === null }, { 'access-hidden': inputHideLabel }]">
      <label class="label" :class="[{ error: inputHasErrors }, { active: inputIsActive }, { accessfocus: inputIsActive }]" :for="inputName">
        <span :data-testid="`${dataTestid}-${inputTestid}-Label`">{{ inputLabel }}</span>
        <FormInputRequired :display-required-text="displayRequiredText" :input-required="inputRequired" :input-testid="inputTestid" :data-testid="dataTestid" />
      </label>

      <div class="label-help">
        <FormInputCounter v-if="inputHasCounter" :input-current-count="inputCurrentCount" :input-min-length="validationRules.minlength" :input-max-length="validationRules.maxlength" :input-testid="inputTestid" :data-testid="dataTestid" />
        <p v-if="inputHint !== null" class="help textBodyHint" :data-testid="`${dataTestid}-${inputTestid}-Hint`">
          {{ inputHint }}
        </p>
      </div>
    </div>

    <div class="field" :class="[{ 'has-addons': inputType === 'password' }]">
      <div class="control control-text" :class="[{ 'has-icons-left': hasIconsLeft }, { 'has-icons-right': hasIconsRight }, { 'is-expanded': inputType === 'password' }]">
        <textarea
          v-if="inputType === 'textarea'"
          class="textarea"
          :class="[{ error: inputHasErrors }, { active: inputIsActive }, { accessfocus: inputIsActive }]"
          @focus="setActiveFieldState()"
          @focusout="setBlurFieldState()"
          @keyup="setBlurFieldState()"
          :type="inputType"
          :id="inputName"
          :name="inputName"
          :data-field-name="inputName"
          :aria-labelledby="inputName"
          :placeholder="inputPlaceholder"
          :minlength="validationRules.minlength"
          :maxlength="validationRules.maxlength"
          :errorpattern="inputErrorPattern"
          :pattern="validationRules.pattern"
          :title="inputLabel"
          :required="inputRequired"
          :aria-required="inputRequired"
          :aria-invalid="inputHasErrors"
          :autocomplete="inputPreventAutoFill"
          :data-testid="`${dataTestid}-${inputTestid}-Input`"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          :disabled="inputDisabled"
          :aria-disabled="inputDisabled"
        ></textarea>
        <input
          v-else
          class="input"
          :class="[{ error: inputHasErrors }, { 'is-success': inputIsDirty && !inputHasErrors }, { active: inputIsActive }, { accessfocus: inputIsActive }, { 'square-baseline': inputHasSquareBaseline }]"
          @focus="setActiveFieldState()"
          @focusout="setBlurFieldState()"
          @keyup="setBlurFieldState()"
          :type="setInputType()"
          :id="inputName"
          :name="inputName"
          :data-field-name="inputName"
          :aria-labelledby="inputName"
          :placeholder="inputPlaceholder"
          :minlength="validationRules.minlength"
          :maxlength="validationRules.maxlength"
          :errorpattern="inputErrorPattern"
          :pattern="validationRules.pattern"
          :title="inputLabel"
          :required="inputRequired"
          :aria-required="inputRequired"
          :aria-invalid="inputHasErrors"
          :autocomplete="setAutoFill()"
          :data-testid="`${dataTestid}-${inputTestid}-Input`"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          :disabled="inputDisabled"
          :aria-disabled="inputDisabled"
        />
        <slot name="iconsLeft"></slot>
        <slot name="iconsRight"></slot>
      </div>

      <FormInputButton v-if="inputType === 'password'" @keydown.enter="togglePasswordVisibility" @click.prevent="togglePasswordVisibility" data-testid="styleGuideId" input-classes="icon" :display-loader="false" :submit-disabled="false" :is-field-add-on-right="true" submit-text="Toggle password visibiity" input-testid="submitButton">
        <template #iconOnly>
          <span class="icon icon-only password-toggle">
            <i class="fas" :class="inputPasswordIconClass"></i>
          </span>
        </template>
      </FormInputButton>
    </div>
    <p v-if="showErrorMessage()" class="error-message" :class="inputService" :data-testid="`${dataTestid}-${inputTestid}-Error`">
      {{ inputErrorPattern }}
    </p>
  </div>
</template>

<script type="ts">

import { Comment, computed, defineComponent, ref } from "vue";
// import props from "@/components/base/forms/hooks/formProps";
import FormInputCounter from "./FormInputCounter.vue"
import FormInputRequired from './FormInputRequired.vue';
import FormInputButton from "@/components/base/forms/FormInputButton.vue";
import formValidationRules from "@/components/base/forms/hooks/formValidationRules";

export default defineComponent({
	name: 'FormInputText',
	components: {
		FormInputCounter,
		FormInputRequired,
    FormInputButton
	},
	props: {
		dataTestid: {
			type: String,
			default: ''
		},
		inputType: {
			type: String,
			default: "text"
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
		inputHint: {
			type: String,
			default: null
		},
		inputHasErrors: {
			type: Boolean,
			default: false
		},
		inputErrorPattern: {
			type: String,
			default: null
		},
		inputPattern: {
			type: String,
			default: null
		},
		inputPlaceholder: {
			type: String,
			default: null
		},
		inputRequired: {
			type: Boolean,
			default: false
		},
		inputHasCounter: {
			type: Boolean,
			default: false
		},
		inputPreventAutoFill: {
			type: Boolean,
			default: false
		},
		submitAttempted: {
			type: Boolean,
			default: false
		},
		modelValue: {
			type: String,
			default: ''
		},
		value: {
			type: [String, undefined],
			default: ''
		},
		inputDisabled: {
			type: Boolean,
			default: false
		},
		inputHideLabel: {
			type: Boolean,
			default: false
		},
		inputService: {
			type: String,
			default: null
		},
    inputHasSquareBaseline: {
			type: Boolean,
			default: false
		},
    displayRequiredText: {
			type: Boolean,
			default: false
		},
	},
	data: function () {
		return {
			inputIsDirty: false,
			inputIsActive: false,
		}
	},
  setup(props) {
		const dataTestId = computed(() => props.dataTestid);
		const inputTestid = computed(() => props.inputTestid);
    const inputCurrentCount = computed(() => props.modelValue.length);
    const inputPattern = computed(() => props.inputPattern);
    const inputPlaceholder = computed(() => props.inputPlaceholder);
		let inputPasswordIconClass = ref("fa-eye-slash");
		let inputPasswordType = ref("password");
    let { getValidatorRules } = formValidationRules();
    const validationRules =  getValidatorRules(inputPattern.value);

    return {
			dataTestId,
			inputTestid,
			inputCurrentCount,
      inputPlaceholder,
			inputPasswordIconClass,
			inputPasswordType,
      validationRules
    }
  },
	computed: {
    hasIconsLeft() {
      return this.$slots.iconsLeft && this.$slots.iconsLeft().findIndex(o => o.type !== Comment) !== -1;
    },
    hasIconsRight() {
      return this.$slots.iconsRight && this.$slots.iconsRight().findIndex(o => o.type !== Comment) !== -1 || this.inputType === "password";
    },
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
		setAutoFill() {
			const valueToSetAutoFillWith = (this.inputType === "password") ? `new-${this.inputType}` : 'off';
			const setFillValue = (this.inputPreventAutoFill) ? valueToSetAutoFillWith : '';
			return setFillValue;
		},
		setInputIsDirty() {
			if (this.submitAttempted || !this.inputIsDirty && this.value.length > 0) {
				this.inputIsDirty = true;
			}
		},
		setActiveFieldState() {
			this.inputIsActive = true;
		},
		setBlurFieldState() {
			this.inputIsActive = false;
			this.setInputIsDirty();
		},
		showErrorMessage() {
			return (this.inputIsDirty && this.inputHasErrors);
		},
		togglePasswordVisibility() {
			if (this.inputPasswordType === "password") {
				this.inputPasswordType = "text";
				this.inputPasswordIconClass = "fa-eye";
			} else {
				this.inputPasswordType = "password";
				this.inputPasswordIconClass = "fa-eye-slash";
			}
		},
		setInputType() {
			return this.inputType === "password" ? this.inputPasswordType : this.inputType;
		}
	}
});
</script>
<style lang="scss">
@import "@/assets/styles/imports.scss";

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="password"],
input[type="date"],
input[type="datetime-local"],
textarea {

  color: $darkGreyText;

  @media (prefers-color-scheme: dark) {
    color: $darkGreyText;

  }

  &.error {
    border-color: $inputBorderColourError;
  }
  &[disabled] {
    transition: background-color 0s ease-in-out 0s;
    background-color: $page-bg-light !important;
    border: 1px solid $inputBorderColour !important;
  }
  &.square-baseline {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}

form {
  .control {
    &-text {
      &.has-icons-left,
      &.has-icons-right {
        .icon {
          color: $base-font-light;
        }
      }
    }
  }
  .label {
    &-wrapper {
      &.counter-only {
        display: flex;

        .label {
          flex-grow: 1;
        }
      }
    }

    &-help {
      display: flex;
      flex-direction: row-reverse;
      align-items: flex-end;
      margin: 0;
      position: relative;
      top: -5px;

      .help {
        flex-grow: 1;
      }
    }
  }
}
</style>
