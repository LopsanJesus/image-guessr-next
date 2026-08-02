/**
 * Returns 3 progressive hints for a given city id (e.g. "new-york").
 *
 * Each hint is an array of masked words, one entry per word of the answer:
 *   getHints("new-york") →
 *     [["N _ _", "Y _ _ _"], ["N _ W", "Y _ R _"], ["N E W", "Y O R _"]]
 *
 * Returning the words separately (instead of a single string) is what keeps
 * multi-word answers readable: HTML collapses consecutive whitespace, so a
 * masked string loses its word boundaries and can wrap in the middle of a word.
 *
 * Letters are revealed in a fixed priority order — first letter of every word,
 * then the even positions, then the rest — always round-robin across words so
 * every word progresses. Each hint reveals at least as many letters as the
 * previous one, and one letter always stays hidden.
 */

const HINT_RATIOS = [0, 0.5, 0.75];

const buildRevealOrder = (words) => {
  const order = [];
  const longestWord = Math.max(...words.map((word) => word.length));

  // First letter of every word.
  words.forEach((_, wordIndex) => order.push(`${wordIndex}:0`));

  // Even positions first, then odd ones, spreading each pass over all words.
  [0, 1].forEach((parity) => {
    for (let i = 1; i < longestWord; i++) {
      if (i % 2 !== parity) continue;
      words.forEach((word, wordIndex) => {
        if (i < word.length) order.push(`${wordIndex}:${i}`);
      });
    }
  });

  return order;
};

export const getHints = (cityId) => {
  // Use the canonical display form: "new-york" → ["NEW", "YORK"]
  const words = cityId
    .split("-")
    .filter(Boolean)
    .map((word) => word.toUpperCase());

  const totalLetters = words.reduce((total, word) => total + word.length, 0);
  const order = buildRevealOrder(words);
  // Never give the whole answer away.
  const maxReveals = Math.max(1, totalLetters - 1);

  let revealCount = 0;
  return HINT_RATIOS.map((ratio) => {
    const target = ratio === 0 ? words.length : Math.ceil(totalLetters * ratio);
    revealCount = Math.min(maxReveals, Math.max(target, revealCount));
    const revealed = new Set(order.slice(0, revealCount));

    return words.map((word, wordIndex) =>
      word
        .split("")
        .map((char, i) => (revealed.has(`${wordIndex}:${i}`) ? char : "_"))
        .join(" ")
    );
  });
};
