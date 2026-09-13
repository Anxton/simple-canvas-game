import type { Entity } from "../core/entity";
import { World } from "../core/world";

export class CollisionSystem {
  world: World;

  constructor(world: World,) {
    this.world = world;
  }

  detectCollisions() { }

  private checkCollision(entityA: Entity, entityB: Entity): boolean {
    if (!this.world.colliders.get(entityA) || !this.world.colliders.get(entityB)) {
      return false;
    }

    return false;
  }
}
