export default function startsWithVowel(string) {
  const vowels = ["a", "e", "i", "o", "u"];

  return vowels.includes(string[0].toLowerCase());
}
