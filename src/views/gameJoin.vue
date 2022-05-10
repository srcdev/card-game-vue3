<template>
  <h2 v-text="t('joinGameTitle')"></h2>
  <p v-text="t('joinGameExplainer')"></p>
  <form @submit.prevent="submitForm()" novalidate class="mt-12">
    <div>
      <div>
        <FormInputText
          :input-has-errors="fieldHasError('username')"
          v-model="formControl.formFieldValues.username"
          input-type="text"
          input-name="username"
          :input-hint="
            t('joinGameFormUserNameHint', {
              example: hintExample('emailaddress'),
            })
          "
          :input-label="t('joinGameFormUserNameLabel')"
          :input-error-pattern="t('joinGameFormUserNameError')"
          input-pattern="username"
          :input-required="true"
          :input-prevent-auto-fill="false"
          :submit-attempted="formControl.submitAttempted"
          :input-disabled="formControl.displayLoader"
          :input-has-counter="true"
        >
        </FormInputText>
      </div>
    </div>
    <div>
      <FormInputButton input-classes="button is-link" :display-loader="formControl.displayLoader" :submit-disabled="formControl.submitDisabled" :submit-text="t('joinGameFormSubmit')" input-testid="btnSubmit" @keydown.enter="submitForm()" @click.prevent="submitForm()"> </FormInputButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, toRef, reactive, watch } from "vue";

import { useI18n } from "vue-i18n";
import FormInputCheckboxOrRadio from "@/components/base/forms/FormInputCheckboxOrRadio.vue";
import FormInputText from "@/components/base/forms/FormInputText.vue";
import FormInputButton from "@/components/base/forms/FormInputButton.vue";
import formValidation from "@/components/base/forms/hooks/formValidation";
import formValidationRules from "@/components/base/forms/hooks/formValidationRules";

import { IFormDataJoinGame } from "@/models/store.game";
import { IFormErrorFields } from "@/types/forms";

const { t } = useI18n();

const formValues = reactive({} as IFormDataJoinGame);
const formPayload = reactive(formValues);
let formControl = reactive({
  formId: "branch-not-found",
  errorCount: 0,
  errorFields: {} as IFormErrorFields,
  formFieldValues: formValues,
  submitAttempted: false,
  submitDisabled: false,
  submitSuccessfull: false,
  displayLoader: false,
});

let errorCountRef = toRef(formControl, "errorCount");
let submitDisabledRef = toRef(formControl, "submitDisabled");
let submitSuccessfullRef = toRef(formControl, "submitSuccessfull");
let displayLoaderRef = toRef(formControl, "displayLoader");

let { getFormFieldsToValidate, doFormValidation, removeEventListeners } = formValidation(formControl, formPayload);
let { getValidatorHint } = formValidationRules();

function fieldHasError(fieldName: string) {
  return formControl.errorFields[fieldName];
}

const hintExample = (inputPattern: string) => {
  return getValidatorHint(inputPattern);
};

getFormFieldsToValidate();

onBeforeUnmount(() => {
  removeEventListeners();
});

const updateStep = (step: string) => {
  if (!submitDisabledRef.value) {
    // nominateStore.updateStep(step);
  }
};

const resetFormState = () => {
  displayLoaderRef.value = false;
  submitDisabledRef.value = false;
  submitSuccessfullRef.value = false;
};

const submitForm = async () => {
  console.log(`submitForm --> Start`);
  if (!submitDisabledRef.value) {
    console.log(`submitForm --> Can submit`);
    if (doFormValidation()) {
      console.log(`submitForm --> Data is valid`);
      displayLoaderRef.value = true;
      submitDisabledRef.value = true;
      try {
        console.log(`submitForm --> Try to post`);
        // const response = await NominationServices.branchNotListed(nominationFlowId, formControl.formFieldValues);
        resetFormState();
        submitSuccessfullRef.value = true;
      } catch (err) {
        console.log(`submitForm --> Try to post catch`);
        resetFormState();
      }
    } else {
      console.log(`submitForm --> Data not valie`);
      resetFormState();
      submitDisabledRef.value = true;
    }
  }
};

watch(errorCountRef, (currentValue, previousValue) => {
  submitDisabledRef.value = currentValue > 0;
});
</script>

<style lang="scss">
@import "@/assets/styles/imports.scss";
</style>
