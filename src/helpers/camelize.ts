export default function camelize(text: any, separator: any) {
  const capitalize = (word: any) => {
    return `${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`;
  };
  const words = text.split(separator);
  const result = [words[0]];
  words.slice(1).forEach((word: any) => result.push(capitalize(word)));
  return result.join("");
}
