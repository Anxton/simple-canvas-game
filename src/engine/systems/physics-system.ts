import type { Collision } from "../components/collision";
import { World } from "../core/world";
import { V, type Vec2 } from "../math/vector";
import { isOOB } from "../utils/oob-utils";

export class PhysicsSystem {
  world: World;

  constructor(world: World) {
    this.world = world;
  }

  updatePhysics(dt: number) {
    for (const [e, pos] of this.world.positions.entries()) {
      this.move(dt, e, pos);
      this.destroyEntityIfOutOfBounds(e, pos);
      // gravity
      this.applyGravity(dt, e);
    }
  }

  resolveCollisions(): void {
    this.world.collisions.forEach((collision: Collision) => {
      const velocityA = this.world.velocities.get(collision.entityA)!;
      // todo: calculate the new velocities based on the collision normal
      const updatedVelocityA = V.flip(velocityA);
      this.world.velocities.set(collision.entityA, updatedVelocityA);

      const velocityB = this.world.velocities.get(collision.entityB)!;
      // todo: calculate the new velocities based on the collision normal
      const updatedVelocityB = V.flip(velocityB);
      this.world.velocities.set(collision.entityB, updatedVelocityB);
      // unstuck the entities by moving them apart along the collision normal
      const posA = this.world.positions.get(collision.entityA)!;
      const posB = this.world.positions.get(collision.entityB)!;
      const normal = collision.normal;
      // move entityA away from entityB
      posA.x -= normal.x * collision.depth;
      posA.y -= normal.y * collision.depth;
      // move entityB away from entityA
      posB.x += normal.x * collision.depth;
      posB.y += normal.y * collision.depth;
    });
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
  private applyGravity(dt: number, e: number) {
    const velocity = this.world.velocities.get(e);
    if (velocity) {
      this.world.velocities.set(e, { x: velocity.x, y: velocity.y + 800 * dt });
    }
  }
}
