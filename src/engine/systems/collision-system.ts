import { ColliderBox, ColliderCircle, ColliderType } from "../components/collider";
import type { Collision } from "../components/collision";
import type { Position } from "../components/position";
import type { Entity } from "../core/entity";
import { World } from "../core/world";
import { V } from "../math/vector";

export class CollisionSystem {
  world: World;

  constructor(world: World) {
    this.world = world;
  }

  detectCollisions() {
    const entities = this.world.entities();

    for (let i = 0; i < entities.length; i++) {
      for (let j = i + 1; j < entities.length; j++) {
        const entityA = entities[i];
        const entityB = entities[j];
        const collision: Collision | null = this.checkCollision(entityA, entityB);
        if (collision) {
          this.world.collisions.push(collision);
        }
      }
    }
  }

  private checkCollision(entityA: Entity, entityB: Entity): Collision | null {
    const colliderA = this.world.colliders.get(entityA);
    const colliderB = this.world.colliders.get(entityB);
    const posA = this.world.positions.get(entityA);
    const posB = this.world.positions.get(entityB);

    if (!colliderA || !colliderB || !posA || !posB) {
      return null;
    }

    switch (colliderA.type) {
      case ColliderType.Circle:
        switch (this.world.colliders.get(entityB)?.type) {
          case ColliderType.Circle:
            return this.checkCircleToCircleCollision(
              entityA,
              posA,
              colliderA as ColliderCircle,
              entityB,
              posB,
              colliderB as ColliderCircle,
            );
          case ColliderType.Box:
            return this.checkCircleToBoxCollision(
              entityA,
              posA,
              colliderA as ColliderCircle,
              entityB,
              posB,
              colliderB as ColliderBox,
            );

          default:
            return null;
        }

      default:
        return null;
    }
  }

  private checkCircleToBoxCollision(
    entityA: Entity,
    posA: Position,
    colliderA: ColliderCircle,
    entityB: Entity,
    posB: Position,
    colliderB: ColliderBox,
  ): Collision | null {
    if (V.distance(posA, posB) <= colliderA.radius + Math.max(colliderB.width, colliderB.height)) {
      return { entityA, entityB, contactPoint: { x: 0, y: 0 }, normal: { x: 0, y: 0 } };
    }

    return null;
  }

  private checkCircleToCircleCollision(
    entityA: Entity,
    posA: Position,
    colliderA: ColliderCircle,
    entityB: Entity,
    posB: Position,
    colliderB: ColliderCircle,
  ): Collision | null {
    // if circle centers are closer than the sum of their radii, they are colliding
    if (V.distance(posA, posB) <= colliderA.radius + colliderB.radius) {
      // todo: calculate the normal vector from entityA to entityB and understand it
      // source: https://stackoverflow.com/questions/345838/ball-to-ball-collision-detection-and-handling
      // wiki: https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional_collision_with_two_moving_objects
      const normal = V.normalize(V.subtract(posB, posA));
      return {
        entityA,
        entityB,
        normal,
        // depth is how much the radii "stick out" of the distance between the centers
        depth: colliderA.radius + colliderB.radius - V.distance(posA, posB),
      };
    }

    return null;
  }
}
