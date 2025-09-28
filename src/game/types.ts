export type Entity = number;

export type Vec2 = { x: number; y: number };

export abstract class ComponentStore<T> {
  private store: Map<Entity, T> = new Map();
  constructor() {}
  get(entity: Entity): T | undefined {
    return this.store.get(entity);
  }
  set(entity: Entity, component: T): void {
    this.store.set(entity, component);
  }
  remove(entity: Entity): boolean {
    return this.store.delete(entity);
  }
  entries(): IterableIterator<[Entity, T]> {
    return this.store.entries();
  }
}
