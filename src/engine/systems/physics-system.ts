import { World } from "../core/world";
import type { Vec2 } from "../math/vector";
import { isOOB } from "../utils/oob-utils";

export class PhysicsSystem {
  world: World;

  constructor(world: World,) {
    this.world = world;
  }

  updatePhysics(dt: number) {
    for (const [e, pos] of this.world.positions.entries()) {
      this.move(dt, e, pos);
      this.destroyEntityIfOutOfBounds(e, pos);
    }
  }

  private move(dt: number, e: number, pos: Vec2) {
    const velocity = this.world.velocities.get(e);
    if (velocity) {
      pos.x += velocity.x * dt;
      pos.y += velocity.y * dt;
    }
  }

  private destroyEntityIfOutOfBounds(e: number, pos: Vec2) {
    const collider = this.world.colliders.get(e);
    if (collider && isOOB(pos, collider, this.world)) {
      this.world.removeEntity(e);
    }
  }
}
