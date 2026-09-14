export type Vec2 = { x: number; y: number };

export const V = {
  add: (a: Vec2, b: Vec2): Vec2 => ({ x: a.x + b.x, y: a.y + b.y }),
  scale: (a: Vec2, k: number): Vec2 => ({ x: a.x * k, y: a.y * k }),
  random: (maxX: number, maxY: number): Vec2 => ({
    x: Math.floor(Math.random() * maxX),
    y: Math.floor(Math.random() * maxY),
  }),
  between: (minX: number, maxX: number, minY: number, maxY: number): Vec2 => ({
    x: Math.floor(Math.random() * (maxX - minX)) + minX,
    y: Math.floor(Math.random() * (maxY - minY)) + minY,
  }),
  distance: (a: Vec2, b: Vec2): number => {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  },
  flip: (vec: Vec2): Vec2 => {
    return { x: vec.x * -1, y: vec.y * -1 };
  },
  magnitude: (vec: Vec2): number => {
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
  },
  dot: (a: Vec2, b: Vec2): number => {
    return a.x * b.x + a.y * b.y;
  },
  normalize: (vec: Vec2): Vec2 => {
    const mag = V.magnitude(vec);
    if (mag === 0) {
      return { x: 0, y: 0 };
    }
    return { x: vec.x / mag, y: vec.y / mag };
  },
  subtract: (a: Vec2, b: Vec2): Vec2 => {
    return { x: a.x - b.x, y: a.y - b.y };
  },
  reflect: (vec: Vec2, normal: Vec2): Vec2 => {
    const dotProduct = V.dot(vec, normal);
    return {
      x: vec.x - 2 * dotProduct * normal.x,
      y: vec.y - 2 * dotProduct * normal.y,
    };
  },
};
