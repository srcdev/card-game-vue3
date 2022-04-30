export default function pascalize(text: any, separator: any) {
  return text
    .split(separator)
    .map((kebab: any) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
    .join("");
}
