<template>
  <div class="field block" :class="[{ error: inputHasErrors }, { active: inputIsActive }, { accessfocus: inputIsActive }]">
    <label class="label" :class="[{ error: inputHasErrors }, { active: inputIsActive }, { accessfocus: inputIsActive }, { 'access-hidden': inputHideLabel }]" :for="inputName">
      <span :data-testid="`${dataTestid}-${inputTestid}-Label`">{{ inputLabel }}</span>
      <FormInputRequired :input-required="inputRequired" :input-testid="inputTestid" :data-testid="dataTestid" />
    </label>
    <div class="control">
      <div class="select" :class="displayClass">
        <select
          :class="[{ error: inputHasErrors }, { 'is-success': inputIsDirty && !inputHasErrors }, { active: inputIsActive }, { accessfocus: inputIsActive }]"
          :aria-labelledby="inputName"
          :id="inputName"
          :name="inputName"
          v-on:input="updateValue($event.target.value)"
          :required="inputRequired"
          @focus="setActiveFieldState($event)"
          @focusout="setBlurFieldState($event)"
          @change="$emit('update:modelValue', $event.target.value)"
          :disabled="inputDisabled"
          :aria-disabled="inputDisabled"
          :data-testid="`${dataTestid}-${inputTestid}-Select`"
        >
          <option v-for="(item, index) in inputOptions" v-bind:key="index" v-text="item.label" :value="item.value" :selected="setIsSelected(item.value)" :data-testid="`${dataTestid}-${inputTestid}-Option-${index}`"></option>
        </select>
      </div>
    </div>
    <p v-if="inputHasErrors" class="error-message select-error" :data-testid="`${dataTestid}-${inputTestid}-Error`">
      {{ inputErrorPattern }}
    </p>
  </div>
</template>

<script type="ts">

import { computed, defineComponent } from "vue";
import FormInputRequired from './FormInputRequired.vue';

export default defineComponent({
	name: 'FormInputSelect',
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
			type: [String, Number],
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
    displayType: {
      type: String,
      default: null
    }
	},
	data: function () {
		return {
			inputIsDirty: false,
			inputIsActive: false,
		}
	},
  setup(props) {
    // const dataTestId = computed(() => props.dataTestid);
    // return {
    //   dataTestId
    // }
  },
	computed: {
    displayClass() {
      return this.displayType !== null ? this.displayType : "";
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
    updateValue: function (value) {
      this.$emit('input', value)
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
    },
    setIsSelected(id) {
      return id == this.modelValue;
    }
  }
});
</script>
<style lang="scss">
@import "@/assets/styles/imports.scss";

.select {
  width: 100%;
  select {
    appearance: none;
    padding: 8px 15px;
    width: 100%;

    ::after {
      content: "";
      width: 0.8em;
      height: 0.5em;
      background-color: $input-border-light
      clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    }

    &.error {
      border-color: $inputBorderColourError;
    }
    &.is-success {
      border-color: $input-border-valid-dark;
    }

    &.transparent {
      background-color: transparent;
      border: none;
    }

    &[disabled] {
      border: 1px solid $inputBorderColour !important;
      color: $input-color !important;
      & > option {
        color: $input-color !important;
      }
    }

    & > option {
      display: block;
      background-color: $page-bg-light;
      color: $base-font-light;
      padding: 6px 12px;
      line-height: 2em;
      min-height: 2em;
      text-indent: 10px;
    }
  }
}
</style>
