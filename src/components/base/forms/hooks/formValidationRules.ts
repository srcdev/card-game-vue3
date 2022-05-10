import { useRootStore } from "@/stores/root";
import validationPatterns from "@/components/base/forms/validationPatterns/";

export default function formValidationRules() {
  function determineValidatorLocale(inputPattern: string) {
    const rootStore = useRootStore();

    let validatorLocale: any = rootStore.validatorLocale;

    if (typeof validationPatterns["global"][inputPattern] !== "undefined") {
      validatorLocale = "global";
    }
    return validatorLocale;
  }

  function getValidatorRules(inputPattern: any) {
    const validatorLocale = determineValidatorLocale(inputPattern);
    const validationRules = {
      pattern: validationPatterns[validatorLocale][inputPattern].pattern,
      minlength: validationPatterns[validatorLocale][inputPattern].minlength,
      maxlength: validationPatterns[validatorLocale][inputPattern].maxlength,
    };

    return validationRules;
  }

  function getValidatorHint(inputPattern: any) {
    const validatorLocale = determineValidatorLocale(inputPattern);
    const validationHint = validationPatterns[validatorLocale][inputPattern].hint;

    return validationHint;
  }

  return {
    getValidatorHint,
    getValidatorRules,
  };
}
