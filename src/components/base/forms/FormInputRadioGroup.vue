<template>
  <div
    class="field block"
    :class="[{ error: inputHasErrors }, { active: inputIsActive }, { accessfocus: inputIsActive }]"
  >
    <p class="label">
      <span :data-testid="`${dataTestid}-${inputTestid}-Label`">{{ inputLabel }}</span>
      <FormInputRequired :input-required="inputRequired" :input-testid="inputTestid" :data-testid="dataTestid" />
    </p>
    <p class="label">{{ inputPlaceholder }}</p>
    <div class="radiogroup inline" role="radiogroup">
      <div class="field" v-for="(item, index) in inputOptions" v-bind:key="index">
        <input
          type="radio"
          class="is-checkradio"
          :class="[
            { error: inputHasErrors },
            { active: inputIsActive },
            { accessfocus: inputIsActive },
            { checked: item.value === value },
          ]"
          :aria-labelledby="`${inputName}_${item.id}`"
          :id="`${inputName}_${item.id}`"
          :name="inputName"
          :required="inputRequired"
          @focus="setActiveFieldState($event)"
          @focusout="setBlurFieldState($event)"
          @change="$emit('update:modelValue', $event.target.value)"
          :checked="item.value === modelValue"
          :value="item.value"
          :disabled="inputDisabled"
          :aria-disabled="inputDisabled"
          :data-testid="`${dataTestid}-${inputTestid}-Input`"
        />
        <label
          class="label"
          :class="[
            { error: inputHasErrors },
            { active: inputIsActive },
            { accessfocus: inputIsActive },
            { checked: item.value === value },
          ]"
          :for="`${inputName}_${item.id}`"
          :data-testid="`${dataTestid}-${inputTestid}-${inputName}-${item.id}-Label`"
        >
          {{ item.label }}
        </label>
      </div>
    </div>
    <p
      v-if="inputHasErrors"
      class="error-message detached radio-group"
      :data-testid="`${dataTestid}-${inputTestid}-Error`"
    >
      {{ inputErrorPattern }}
    </p>
  </div>
</template>

<script type="ts">

import { defineComponent } from "vue";
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
		inputPlaceholder: {
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
		inputAutocomplete: {
			type: String,
			default: 'off'
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
@import "../../../../node_modules/bulma/sass/utilities/mixins.sass";

@include tablet {
  .radiogroup {
    &.inline {
      display: flex;
      .field {
        display: inline-block;
        margin-left: 12px;
        width: auto;

        &:first-child {
          margin-left: 0;
        }
      }
    }
  }
}
</style>
