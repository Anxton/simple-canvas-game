import { ComponentStore, Entity } from "../types.js";

export class World {
  private _entities: Entity[] = [];
  terminationSignal: number = 0;
  lastRender: number = 0;
  constructor(
    public width: number = 800,
    public height: number = 600,
    private stores: ComponentStore<any>[] = []
  ) {}

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
