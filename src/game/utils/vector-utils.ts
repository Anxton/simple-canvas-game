import { Vec2 } from "../types.js";

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
};
