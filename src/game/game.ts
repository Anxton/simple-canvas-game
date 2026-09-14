import { ColliderCircle } from "../engine/components/collider";
import { SpriteCircle } from "../engine/components/sprite";
import { World } from "../engine/core/world";
import { V } from "../engine/math/vector";
import { CollisionSystem } from "../engine/systems/collision-system";
import { PhysicsSystem } from "../engine/systems/physics-system";
import { RenderSystem } from "../engine/systems/render-system";

export class Game {
  private world: World;
  private physicsSystem: PhysicsSystem;
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

  init(): void {
    // Initialize the game
    this.initGame();

    // Main loop
    let last: DOMHighResTimeStamp;

    // cap at 16.67ms ~ 60fps
    const MAX_DT = 1 / 60;

    // cap at 7.08ms ~ 144fps
    // const MAX_DT = 1 / 144;

    const updateGameFrame = (now: DOMHighResTimeStamp) => {
      this.world.terminationSignal = requestAnimationFrame(updateGameFrame);
      const dt = Math.min((now - last) / 1000, MAX_DT);
      last = now;

      this.processGameTick(dt, now);
    };

    // Start
    requestAnimationFrame((t) => {
      last = t;
      updateGameFrame(t);
    });
  }

  private processGameTick(dt: number, now: number) {
    this.physicsSystem.updatePhysics(dt);
    this.collisionSystem.detectCollisions();
    this.physicsSystem.resolveCollisions();
    this.world.collisions.length = 0;
    this.renderSystem.render(dt, now);
  }

  private initGame(): void {
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

    // Random size between 40 and 120
    const size = 40 + Math.ceil(Math.random() * 80);
    this.world.colliders.set(e, new ColliderCircle(size));
    const randomColor = this.COLORS[Math.floor(Math.random() * this.COLORS.length)];
    this.world.sprites.set(e, new SpriteCircle(size, randomColor));
  }

  clearEntities(): void {
    for (const entity of this.world.entities()) {
      this.world.removeEntity(entity);
    }
  }

  stop(): void {
    cancelAnimationFrame(this.world.terminationSignal);
  }
}
