import type { Entity } from "../core/entity";
import type { Vec2 } from "../math/vector";

export type Collision = {
  entityA: Entity;
  entityB: Entity;
  contactPoint?: Vec2;
  normal: Vec2;
  depth?: number;
};
