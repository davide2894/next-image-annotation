export const normalizeCoordinates = (
  x: number,
  y: number,
  imageWidth: number,
  imageHeight: number
): [number, number] => {
  const normalizedX = x / imageWidth;
  const normalizedY = y / imageHeight;

  return [normalizedX, normalizedY];
};
