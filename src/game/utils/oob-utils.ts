import {
  Collider,
  ColliderBox,
  ColliderCircle,
  ColliderKind,
  ColliderPolygon,
} from "../components/collider.js";
import { World } from "../core/world.js";

const isOOBBox = (
  pos: { x: number; y: number },
  collider: ColliderBox,
  world: World
) => {
  return (
    pos.x < -collider.width ||
    pos.x > world.width ||
    pos.y < -collider.height ||
    pos.y > world.height
  );
};

const isOOBCircle = (
  pos: { x: number; y: number },
  collider: ColliderCircle,
  world: World
) => {
  return (
    pos.x < -collider.radius ||
    pos.x > world.width + collider.radius ||
    pos.y < -collider.radius ||
    pos.y > world.height + collider.radius
  );
};

const isOOBPolygon = (
  pos: { x: number; y: number },
  collider: ColliderPolygon,
  world: World
) => {
  // TODO
  return false;
};

export const isOOB = (
  pos: { x: number; y: number },
  collider: Collider,
  world: World
) => {
  switch (collider.kind) {
    case ColliderKind.Box:
      return isOOBBox(pos, collider as ColliderBox, world);
    case ColliderKind.Circle:
      return isOOBCircle(pos, collider as ColliderCircle, world);
    case ColliderKind.Polygon:
      return isOOBPolygon(pos, collider as ColliderPolygon, world);
    default:
      return false;
  }
};
