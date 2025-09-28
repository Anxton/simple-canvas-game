import { ComponentStore } from "../types.js";

export enum SpriteKind {
  Rectangle,
  Circle,
  Image,
}

export abstract class Sprite {
  constructor(public kind: SpriteKind) {}
}
export class SpriteRectangle extends Sprite {
  constructor(
    public width: number,
    public height: number,
    public color: string = "black"
  ) {
    super(SpriteKind.Rectangle);
    if (width <= 0 || height <= 0) {
      throw new Error("SpriteRectangle width and height must be positive");
    }
  }
}

export class SpriteCircle extends Sprite {
  constructor(public radius: number, public color: string = "black") {
    super(SpriteKind.Circle);
    if (radius <= 0) {
      throw new Error("SpriteCircle radius must be positive");
    }
  }
}

export class SpriteImage extends Sprite {
  constructor(public src: string, public width: number, public height: number) {
    super(SpriteKind.Image);
    if (width <= 0 || height <= 0) {
      throw new Error("SpriteImage width and height must be positive");
    }
  }
}

export class SpriteStore extends ComponentStore<Sprite> {}
