import { mount } from "@vue/test-utils";
import { it, describe, expect } from "vitest";
import { translations } from "../../locales/index";
import Component from "../../FormInputText.vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";

//describe("Mounted Form Input Text component", () => {
it("Test Form Input Text component", async () => {
  const pinia = createPinia();
  const locale: any = "en-GB";

  const i18n = createI18n({
    legacy: false,
    locale: locale,
    messages: translations,
  });

  const propsData = {
    dataTestid: "dataTestid",
    inputType: "text",
    inputTestid: "inputTestid",
    inputName: "inputName",
    inputLabel: "inputLabel",
    inputHint: "inputHint",
    // inputHasErrors: {
    //   type: Boolean,
    //   default: false,
    // },
    inputErrorPattern: "inputErrorPattern",
    inputPattern: "emailaddress",
    inputPlaceholder: "inputPlaceholder",
    // inputRequired: {
    //   type: Boolean,
    //   default: false,
    // },
    // inputHasCounter: {
    //   type: Boolean,
    //   default: false,
    // },
    // inputPreventAutoFill: {
    //   type: Boolean,
    //   default: false,
    // },
    // submitAttempted: {
    //   type: Boolean,
    //   default: false,
    // },
    // modelValue: {
    //   type: String,
    //   default: "",
    // },
    // value: {
    //   type: String,
    //   default: "",
    // },
    // inputDisabled: {
    //   type: Boolean,
    //   default: false,
    // },
  };
  const wrapper = mount(Component, {
    global: {
      plugins: [i18n, pinia],
    },
    props: propsData,
  });

  expect(wrapper.vm).toBeTruthy();

  // Test element label
  expect(wrapper.get(`[data-testid="${propsData.dataTestid}-${propsData.inputTestid}-Label"]`).text()).toEqual(
    propsData.inputLabel
  );
  expect(
    wrapper.get(`[data-testid="${propsData.dataTestid}-${propsData.inputTestid}-Label"]`).text()
  ).toMatchSnapshot();

  // Test error state
  await wrapper.setProps({
    inputHasErrors: true,
  });

  expect(wrapper.get(`[type="${propsData.inputType}"]`).classes()).toContain("error");
  expect(wrapper.get(`label`).classes()).toContain("error");
});
//});
