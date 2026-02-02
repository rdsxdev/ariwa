import dictionary from "@/utils/dictionary.json";

function generatePot(len: number): string[] {
  return Object.values(dictionary)[
    Math.floor(Math.random() * Object.values(dictionary).length + 0)
  ].filter((x: string) => x.length === len);
}

export function generateRandomWord(length: number) {
  let pot = generatePot(length);
  while (pot.length < 8) {
    pot = generatePot(length);
  }

  const randomWord = pot[Math.floor(Math.random() * pot.length + 0)];

  return randomWord;
}
