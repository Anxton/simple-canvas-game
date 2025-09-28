import { ColliderCircle, ColliderStore } from "./game/components/collider.js";
import { PositionStore } from "./game/components/position.js";
import { SpriteCircle, SpriteStore } from "./game/components/sprite.js";
import { VelocityStore } from "./game/components/velocity.js";
import { World } from "./game/core/world.js";
import { CollisionSystem } from "./game/systems/collision-system.js";
import { PhysicsSystem } from "./game/systems/physics-system.js";
import { RenderSystem } from "./game/systems/render-system.js";
import { V } from "./game/utils/vector-utils.js";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const canvas2DContext = canvas.getContext("2d")!;

// Stores
const positionStore = new PositionStore();
const velocityStore = new VelocityStore();
const colliderStore = new ColliderStore();
const spriteStore = new SpriteStore();

// World size tied to canvas size (logical pixels)
const world = new World(canvas.width, canvas.height, [
  positionStore,
  velocityStore,
  colliderStore,
  spriteStore,
]);

// Systems
const physicsSystem = new PhysicsSystem(
  world,
  positionStore,
  velocityStore,
  colliderStore
);
const collisionSystem = new CollisionSystem(
  world,
  positionStore,
  velocityStore,
  colliderStore
);
const renderSystem = new RenderSystem(
  world,
  canvas2DContext,
  positionStore,
  spriteStore
);

// Random entities
for (let i = 0; i < 10; i++) {
  const e = world.createEntity();
  positionStore.set(e, V.random(world.width, world.height));
  velocityStore.set(e, V.between(-200, 200, -200, 200));
  const size = Math.random() * 20 + 10;
  colliderStore.set(e, new ColliderCircle(size));
  spriteStore.set(e, new SpriteCircle(size, "red"));
}

// Main loop
let last: DOMHighResTimeStamp;

// cap at ~7ms ~ 144fps
const MAX_DT = 1 / 144;

const main = (now: DOMHighResTimeStamp) => {
  world.terminationSignal = requestAnimationFrame(main);
  const dt = Math.min((now - last) / 1000, MAX_DT);
  last = now;

  collisionSystem.detectCollisions();
  physicsSystem.updatePhysics(dt);
  renderSystem.render();
};

// Start
requestAnimationFrame((t) => {
  last = t;
  main(t);
});
