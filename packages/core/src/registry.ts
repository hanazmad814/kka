export interface RegistryEntry<T> {
  key: string;
  value: T;
}

export class Registry<T> {
  private readonly items = new Map<string, T>();

  register(entry: RegistryEntry<T>): void {
    this.items.set(entry.key, entry.value);
  }

  get(key: string): T | undefined {
    return this.items.get(key);
  }
}
