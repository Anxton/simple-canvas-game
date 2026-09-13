import { Collider } from "../components/collider";
import type { Position } from "../components/position";
import { Sprite } from "../components/sprite";
import type { Velocity } from "../components/velocity";
import { ComponentStore } from "./component-store";
import type { Entity } from "./entity";

export class World {
  terminationSignal: number = 0;
  previousRenderTimestamp: number = 0;

  _entities: Entity[] = [];

  width: number;
  height: number;

  positions = new ComponentStore<Position>();
  velocities = new ComponentStore<Velocity>();
  colliders = new ComponentStore<Collider>();
  sprites = new ComponentStore<Sprite>();

  stores: ComponentStore<any>[] = [
    this.positions,
    this.velocities,
    this.colliders,
    this.sprites,
  ];

  constructor(width: number = 800, height: number = 600) {
    this.width = width;
    this.height = height;
  }

  createEntity = () => {
    const id = this._entities.length;
    this._entities.push(id);
    return id;
  };

  removeEntity = (entity: Entity) => {
    this._entities = this._entities.filter((e) => e !== entity);
    this.stores.forEach((store) => store.remove(entity));
    if (this._entities.length === 0) {
      window.cancelAnimationFrame(this.terminationSignal);
    }
  };

  get numberOfEntities() {
    return this._entities.length;
  }

  /**
   * Get a copy of the entities array
   * @return array of entities
   */
  get entities() {
    return [...this._entities];
  }
}
