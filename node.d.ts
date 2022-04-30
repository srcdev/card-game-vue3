// node.d.ts
interface ImportMeta {
  env: {
    VITE_APP_TITLE?: string;
    VITE_APP_I18N_LOCALE?: string;
    VITE_APP_I18N_FALLBACK_LOCALE?: string;
    VITE_APP_VALIDATOR_COUNTRY?: string;
    VITE_APP_BASE_URL?: string;
    VITE_APP_ROOT_PATH?: string;
    VITE_APP_HOST?: string;
    VITE_APP_PORT?: string;
  };
}
