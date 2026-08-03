/**
 * Returns 3 progressive hints for an answer already written in the player's
 * language (e.g. "Nueva York" in Spanish, "New York" in English).
 *
 * Each hint is an array of masked words, one entry per word of the answer:
 *   getHints("New York") →
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
 *
 * Punctuation ("Saint Peter's Square") is never masked: it is shown from the
 * first hint and does not consume any of the reveal budget.
 */

const HINT_RATIOS = [0, 0.5, 0.75];

const IS_LETTER = /[\p{L}\p{N}]/u;

// Positions of the maskable characters of each word, in reading order.
const getLetterPositions = (words) =>
  words.map((word) =>
    word
      .split("")
      .map((char, i) => (IS_LETTER.test(char) ? i : null))
      .filter((i) => i !== null)
  );

const buildRevealOrder = (letterPositions) => {
  const order = [];
  const longestWord = Math.max(...letterPositions.map((letters) => letters.length));

  // First letter of every word.
  letterPositions.forEach((letters, wordIndex) => {
    if (letters.length > 0) order.push(`${wordIndex}:${letters[0]}`);
  });

  // Even positions first, then odd ones, spreading each pass over all words.
  [0, 1].forEach((parity) => {
    for (let i = 1; i < longestWord; i++) {
      if (i % 2 !== parity) continue;
      letterPositions.forEach((letters, wordIndex) => {
        if (i < letters.length) order.push(`${wordIndex}:${letters[i]}`);
      });
    }
  });

  return order;
};

export const getHints = (answer) => {
  const words = (answer || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.toUpperCase());

  if (words.length === 0) return HINT_RATIOS.map(() => []);

  const letterPositions = getLetterPositions(words);
  const totalLetters = letterPositions.reduce((total, letters) => total + letters.length, 0);
  const order = buildRevealOrder(letterPositions);
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
        .map((char, i) =>
          !IS_LETTER.test(char) || revealed.has(`${wordIndex}:${i}`) ? char : "_"
        )
        .join(" ")
    );
  });
};
