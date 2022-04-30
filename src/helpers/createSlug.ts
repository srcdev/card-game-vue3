export function shortSlug() {
  function chr4() {
    return Math.random().toString(16).slice(-4);
  }
  return chr4() + "-" + chr4();
}

export function longSlug() {
  function chr4() {
    return Math.random().toString(16).slice(-4);
  }
  return chr4() + chr4() + "-" + chr4() + "-" + chr4() + "-" + chr4() + "-" + chr4() + chr4() + chr4();
}

export default {
  shortSlug,
  longSlug,
};
