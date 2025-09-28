export const percent = (learned: number, total: number) =>
  total === 0 ? 0 : Math.round((learned / total) * 100);
