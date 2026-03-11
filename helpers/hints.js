/**
 * Returns 3 progressive hints for a given city id (e.g. "new-york").
 * hint 1: first letter + dashes  → "N _ _ _ _ _ _ _"
 * hint 2: first 3 chars          → "N E W  _ _ _ _"
 * hint 3: every other char       → "N E W  Y O R K" (most letters)
 */
export const getHints = (cityId) => {
  // Use the canonical display form: "new york" → "NEW YORK"
  const display = cityId.split("-").join(" ").toUpperCase();
  const chars = display.split("");

  const mask = (revealFn) =>
    chars.map((c, i) => (c === " " ? " " : revealFn(c, i) ? c : "_")).join(" ");

  return [
    mask((c, i) => i === 0),
    mask((c, i) => i < 3 || (chars[i - 1] === " " && i < 5)),
    mask((c, i) => i % 2 === 0 || chars[i - 1] === " "),
  ];
};
