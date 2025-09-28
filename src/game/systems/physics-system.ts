import { ColliderStore } from "../components/collider.js";
import { PositionStore } from "../components/position.js";
import { VelocityStore } from "../components/velocity.js";
import { World } from "../core/world.js";
import { Vec2 } from "../types.js";
import { isOOB } from "../utils/oob-utils.js";

export class PhysicsSystem {
  constructor(
    private world: World,
    private positionStore: PositionStore,
    private velocityStore: VelocityStore,
    private colliderStore: ColliderStore
  ) {}

  updatePhysics(dt: number) {
    for (const [e, pos] of this.positionStore.entries()) {
      this.move(dt, e, pos);
      this.destroyEntityIfOutOfBounds(e, pos);
    }
  }

  private move(dt: number, e: number, pos: Vec2) {
    const velocity = this.velocityStore.get(e);
    if (velocity) {
      pos.x += velocity.x * dt;
      pos.y += velocity.y * dt;
    }
  }

  private destroyEntityIfOutOfBounds(e: number, pos: Vec2) {
    const collider = this.colliderStore.get(e);
    if (collider && isOOB(pos, collider, this.world)) {
      this.world.removeEntity(e);
    }
  }
}
