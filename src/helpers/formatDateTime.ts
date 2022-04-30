export function formatDate(validatorLocale: string, dateValue: Date) {
  const val = new Date(dateValue);
  const options: any = { year: "numeric", month: "numeric", day: "numeric" };
  return val.toLocaleDateString(validatorLocale, options);
}

export function formatShortTime(validatorLocale: string, timeValue: Date) {
  const val = new Date(timeValue);
  const options: any = { hour: "2-digit", minute: "2-digit" };
  return val.toLocaleDateString(validatorLocale, options);
}

export default {
  formatDate,
  formatShortTime,
};
