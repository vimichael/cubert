export const percent = (learned: number, total: number) =>
  total === 0 ? 0 : Math.round((learned / total) * 100);

export const formatTime = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const displaySeconds = seconds % 60;
  const displayMs = ms % 1000;
  return `${minutes}:${displaySeconds.toString().padStart(2, "0")}.${Math.floor(
    displayMs / 10,
  )
    .toString()
    .padStart(2, "0")}`;
};
