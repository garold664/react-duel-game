function getDistance(x1: number, y1: number, x2: number, y2: number) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  const distance = Math.hypot(dx, dy);
  return distance;
}

export default getDistance;
