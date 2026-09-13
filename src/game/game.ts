import { ColliderCircle } from "../engine/components/collider";
import { SpriteCircle } from "../engine/components/sprite";
import { World } from "../engine/core/world";
import { V } from "../engine/math/vector";
import { CollisionSystem } from "../engine/systems/collision-system";
import { PhysicsSystem } from "../engine/systems/physics-system";
import { RenderSystem } from "../engine/systems/render-system";

export class Game {

  private world: World;
  private physicsSystem: PhysicsSystem
  private collisionSystem: CollisionSystem;
  private renderSystem: RenderSystem;

  constructor(canvas: HTMLCanvasElement, canvas2DContext: CanvasRenderingContext2D) {
    // World size tied to canvas size (logical pixels)
    this.world = new World(canvas.width, canvas.height);

    // Systems
    this.physicsSystem = new PhysicsSystem(this.world);
    this.collisionSystem = new CollisionSystem(this.world);
    this.renderSystem = new RenderSystem(this.world, canvas2DContext);

  }

  start(): void {
    // Initialize the game
    this.init();

    // Main loop
    let last: DOMHighResTimeStamp;

    // cap at ~16ms ~ 60fps
    const MAX_DT = 1 / 1;

    // cap at ~7ms ~ 144fps
    // const MAX_DT = 1 / 144;

    const tick = (now: DOMHighResTimeStamp) => {
      this.world.terminationSignal = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, MAX_DT);
      last = now;

      this.collisionSystem.detectCollisions();
      this.physicsSystem.updatePhysics(dt);
      this.renderSystem.render();
    };

    // Start
    requestAnimationFrame((t) => {
      last = t;
      tick(t);
    });
  }

  private init(): void {
    // 10 random entities
    // refactor for loop
    for (let i = 0; i < 10; i++) {
      this.addEntity();
    }
  }

  private COLORS = ["red", "green", "blue", "yellow", "purple", "orange", "cyan", "magenta"];

  addEntity(): void {
    const e = this.world.createEntity();
    this.world.positions.set(e, V.random(this.world.width, this.world.height));
    this.world.velocities.set(e, V.between(-200, 200, -200, 200));

    // Random size between 10 and 30
    const size = 10 + Math.ceil(Math.random() * 20);
    this.world.colliders.set(e, new ColliderCircle(size));
    const randomColor = this.COLORS[Math.floor(Math.random() * this.COLORS.length)];
    this.world.sprites.set(e, new SpriteCircle(size, randomColor));
  }
}