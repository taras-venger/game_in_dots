export const generateInitMoves = num =>
  Array.from({ length: num }, () => 'default');

export const shuffleArray = num =>
  Array.from({ length: num })
    .map((_, i) => i)
    .sort(() => Math.random() - 0.5);
