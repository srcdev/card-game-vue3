export type TLocalesList = {
  id: string;
  label: string;
  value: string;
};

export type TRootState = {
  currentView: string;
  localesList: TLocalesList[];
  locale: string;
  validatorLocale: string;
  overlayOpen: boolean;
};
