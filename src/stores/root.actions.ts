export const rootActions = {
  setLocale(this: any, payload: string) {
    this.locale = payload;
  },
  setValidatorLocale(this: any, payload: string) {
    this.validatorLocale = payload;
  },
  setOverlayOpen(this: any, isOpen: boolean) {
    this.overlayOpen = isOpen;
    if (isOpen) {
      document.querySelector("html")?.classList.add("overlay-open");
    } else {
      document.querySelector("html")?.classList.remove("overlay-open");
    }
  },
};
