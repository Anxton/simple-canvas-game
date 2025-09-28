import { ComponentStore } from "../types.js";

export enum ColliderKind {
  Box,
  Circle,
  Polygon,
}

export abstract class Collider {
  constructor(public kind: ColliderKind) {}
}

export class ColliderBox extends Collider {
  constructor(public width: number, public height: number) {
    super(ColliderKind.Box);
    if (width <= 0 || height <= 0) {
      throw new Error("ColliderBox width and height must be positive");
    }
  }
}

export class ColliderCircle extends Collider {
  constructor(public radius: number) {
    super(ColliderKind.Circle);
    if (radius <= 0) {
      throw new Error("ColliderCircle radius must be positive");
    }
  }
}

export class ColliderPolygon extends Collider {
  constructor(public points: { x: number; y: number }[]) {
    super(ColliderKind.Polygon);
    if (points.length < 3) {
      throw new Error("ColliderPolygon must have at least 3 points");
    }
  }
}

export class ColliderStore extends ComponentStore<Collider> {}
