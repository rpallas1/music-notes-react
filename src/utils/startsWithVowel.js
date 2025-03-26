/**
 * Returns true if the string starts with a vowel, false otherwise.
 *
 * @param {string} string - The string to check.
 * @returns {boolean} True if the string starts with a vowel, false otherwise.
 */
export default function startsWithVowel(string) {
  const vowels = ["a", "e", "i", "o", "u"];

  return vowels.includes(string[0].toLowerCase());
}
