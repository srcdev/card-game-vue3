export default function formValidation(formControl?: any, formPayload?: any) {
  function testPattern(validationPattern: any, value: any) {
    const regex = new RegExp(validationPattern);
    return regex.test(value);
  }

  function getEventListenerType(inputType: any) {
    const formFieldType: string = typeof inputType !== "undefined" ? inputType : null;
    const checkInputTypes = ["select-one", "radio", "checkbox", "date", "datetime-local"];
    return checkInputTypes.indexOf(formFieldType) < 0 ? "keyup" : "change";
  }

  function getFormElements() {
    let formElements = document.querySelectorAll(`#${formControl.formId} input,#${formControl.formId} textarea,#${formControl.formId} select`);
    return formElements;
  }

  function removeEventListeners() {
    let formElements = getFormElements();
    formElements.forEach((formField: any) => {
      formField.removeEventListener(getEventListenerType(formField.type), doFormValidation);
    });
  }

  function getFormFieldsToValidate() {
    let formElements = getFormElements();

    formElements.forEach((formField: any) => {
      formControl.errorFields[formField.name] = false;
      if (formField.type === "radio") {
        let radioGroupValue = <HTMLInputElement>document.querySelector(`#${formControl.formId} [name="${formField.type}"]:checked`);
        if (radioGroupValue !== null) {
          formControl.formFieldValues[formField.name] = radioGroupValue.value;
          formPayload[formField.name] = formField.value.trim();
        }
      } else if (formField.type === "textarea") {
        formControl.errorFields[formField.name] = !testPattern(formField.getAttribute("pattern"), formField.value);
        formPayload[formField.name] = formField.value.trim();
      } else {
        formControl.formFieldValues[formField.name] = formField.value;
        formPayload[formField.name] = formField.value.trim();
      }
      formField.addEventListener(getEventListenerType(formField.type), doFormValidation);
    });
  }

  function doFormValidation() {
    formControl.submitAttempted = true;
    getFormFieldsToValidate();
    formControl.errorFields = {};
    formControl.errorCount = 0;

    const invalidFormFields = document.querySelectorAll(`#${formControl.formId} :not(fieldset) :invalid`);

    invalidFormFields.forEach((formField: any) => {
      if (typeof formControl.errorFields[formField.name] === "undefined") {
        formControl.errorCount++;
      }
      formControl.errorFields[formField.name] = true;
    });

    const formValid = formControl.errorCount === 0;
    formControl.submitDisabled = !formValid;

    return formValid;
  }

  return {
    getFormFieldsToValidate,
    doFormValidation,
    removeEventListeners,
  };
}
