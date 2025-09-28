import { Position, PositionStore } from "../components/position.js";
import {
  Sprite,
  SpriteCircle,
  SpriteKind,
  SpriteRectangle,
  SpriteStore,
} from "../components/sprite.js";
import { World } from "../core/world.js";

export class RenderSystem {
  constructor(
    private world: World,
    private ctx: CanvasRenderingContext2D,
    private pos: PositionStore,
    private shape: SpriteStore
  ) {}

  render = () => {
    this.clear();

    this.renderNumberOfEntities();
    this.renderEntities();
  };

  /** Clear the canvas */
  private clear = () => {
    this.ctx.clearRect(0, 0, this.world.width, this.world.height);
  };

  /** Write in the center of the canvas the number of entities */
  private renderNumberOfEntities = () => {
    this.ctx.fillStyle = "black";
    this.ctx.font = "150px Jetbrains Mono";
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
      const pos = this.pos.get(entity);
      if (pos) {
        const shape = this.shape.get(entity);
        if (shape) {
          this.draw(pos, shape);
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
