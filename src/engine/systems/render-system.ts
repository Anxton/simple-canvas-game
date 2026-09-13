import type { Position } from "../components/position";
import {
  Sprite,
  SpriteCircle,
  SpriteKind,
  SpriteRectangle,
} from "../components/sprite";
import { World } from "../core/world";

export class RenderSystem {
  world: World;
  ctx: CanvasRenderingContext2D;

  constructor(world: World, ctx: CanvasRenderingContext2D) {
    this.world = world;
    this.ctx = ctx;
  }

  render = () => {
    this.clear();
    this.renderEntities();
    this.renderNumberOfEntities();
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
    for (const entity of this.world.entities) {
      const pos = this.world.positions.get(entity);
      if (pos) {
        const sprite = this.world.sprites.get(entity);
        if (sprite) {
          this.draw(pos, sprite);
        }
      }
    }
  }

  /** Draw a shape */
  private draw(pos: Position, sprite: Sprite) {
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
}
