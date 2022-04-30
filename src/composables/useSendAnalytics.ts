export function useMatomo(payload: object) {
  if (typeof window._paq !== "undefined") {
    window._paq.push(payload);
  }
}

export default {
  useMatomo,
};
