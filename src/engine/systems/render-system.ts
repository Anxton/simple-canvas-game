import type { Position } from "../components/position";
import { Sprite, SpriteCircle, SpriteKind, SpriteRectangle } from "../components/sprite";
import { World } from "../core/world";

export class RenderSystem {
  world: World;
  ctx: CanvasRenderingContext2D;

  debug: boolean;
  debugCooldown: number = 1;
  prevDebugDt: number = 0;

  constructor(world: World, ctx: CanvasRenderingContext2D) {
    this.world = world;
    this.ctx = ctx;
    this.debug = true;
  }

  render = (dt: number, time: DOMHighResTimeStamp) => {
    this.clear();
    this.renderEntities();
    this.renderNumberOfEntities();

    if (this.debug) {
      if (this.debugCooldown <= 0) {
        this.prevDebugDt = dt;
        this.renderDebugInfo(dt, time);
        this.debugCooldown = 1; // Reset the cooldown
      } else {
        this.renderDebugInfo(this.prevDebugDt, time);
        this.debugCooldown -= dt;
      }
    }
  };

  /** Clear the canvas */
  private clear = () => {
    this.ctx.clearRect(0, 0, this.world.width, this.world.height);
  };

  /** Write in the center of the canvas the number of entities */
  private renderNumberOfEntities = () => {
    this.ctx.fillStyle = "black";
    this.ctx.font = "200px JetBrainsMono Nerd Font";
    this.ctx.textBaseline = "middle";
    const text = this.world.numberOfEntities.toString();
    const textMetrics = this.ctx.measureText(text);
    // center
    const x = this.world.width / 2 - textMetrics.width / 2;
    const y = this.world.height / 2;
    this.ctx.fillText(text, x, y);
  };

  /** Render all entities */
  private renderEntities() {
    for (const entity of this.world.entities()) {
      const pos = this.world.positions.get(entity);
      if (pos) {
        const sprite = this.world.sprites.get(entity);
        if (sprite) {
          this.draw(pos, sprite, entity);
        }
      }
    }
  }

  /** Draw a shape */
  private draw(pos: Position, sprite: Sprite, entity: number) {
    switch (sprite.kind) {
      case SpriteKind.Rectangle:
        this.drawRectangle(pos, sprite as SpriteRectangle);
        break;
      case SpriteKind.Circle:
        this.drawCircle(pos, sprite as SpriteCircle);
        break;
      case SpriteKind.Image:
        // this.drawImage(pos, sprite as Image);
        break;
      default:
        break;
    }
    if (this.debug) {
      this.ctx.strokeStyle = "black";
      this.ctx.strokeRect(pos.x, pos.y, 1, 1);
      // show velocity, x, y, and id
      const velocity = this.world.velocities.get(entity);
      if (velocity) {
        this.ctx.fillStyle = "black";
        this.ctx.font = "16px JetBrainsMono Nerd Font";
        this.ctx.textBaseline = "top";
        const text1 = `id: ${entity} | x: ${pos.x.toFixed(2)} | y: ${pos.y.toFixed(2)}`;
        this.ctx.fillText(text1, pos.x + 5, pos.y + 5);
        const text2 = `vx: ${velocity.x.toFixed(2)} | vy: ${velocity.y.toFixed(2)}`;
        this.ctx.fillText(text2, pos.x + 5, pos.y + 25);
      }
    }
  }

  /** Draw a rectangle */
  private drawRectangle(pos: Position, rect: SpriteRectangle) {
    this.ctx.fillStyle = rect.color;
    this.ctx.fillRect(pos.x, pos.y, rect.width, rect.height);
  }

  private drawCircle(pos: Position, circle: SpriteCircle) {
    this.ctx.fillStyle = circle.color;
    this.ctx.beginPath();
    this.ctx.arc(pos.x, pos.y, circle.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private renderDebugInfo(dt: number, time: DOMHighResTimeStamp) {
    this.ctx.fillStyle = "black";
    this.ctx.font = "20px JetBrainsMono Nerd Font";
    this.ctx.textBaseline = "top";

    const debugInfo = [
      `FPS: ${(1 / dt).toFixed(2)}`,
      `dt: ${dt.toFixed(4)}`,
      `Time: ${(time / 1000).toFixed(2)}s`,
      `Entities: [${this.world.entities()}]`,
      `Collisions: [${this.world.collisions.map((c) => `(${c.entityA}, ${c.entityB})`)}]`,
    ];
    for (let i = 0; i < debugInfo.length; i++) {
      this.ctx.fillText(debugInfo[i], 10, 10 + i * 20);
    }
  }
}
