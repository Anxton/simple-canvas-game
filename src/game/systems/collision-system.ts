import { ColliderStore } from "../components/collider.js";
import { PositionStore } from "../components/position.js";
import { VelocityStore } from "../components/velocity.js";
import { World } from "../core/world.js";

export class CollisionSystem {
  constructor(
    private world: World,
    private pos: PositionStore,
    private velocity: VelocityStore,
    private collider: ColliderStore
  ) {}

  detectCollisions() {
    // TODO
  }
}
