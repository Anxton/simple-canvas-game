import { Collider } from "../components/collider";
import type { Collision } from "../components/collision";
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
  collisions = [] as Collision[];

  stores: ComponentStore<any>[] = [this.positions, this.velocities, this.colliders, this.sprites];

  constructor(width: number = 800, height: number = 600) {
    this.width = width;
    this.height = height;
  }

  createEntity = () => {
    const id = Math.max(...this._entities, 0) + 1;
    this._entities.push(id);
    return id;
  };

  removeEntity = (entity: Entity) => {
    this.stores.forEach((store) => store.remove(entity));
    this._entities = this._entities.filter((e) => e !== entity);
  };

  get numberOfEntities() {
    return this._entities.length;
  }

  /**
   * Get a copy of the entities array
   * @return array of entities
   */
  entities(): Entity[] {
    return [...this._entities];
  }
}
