export class Cache<T> {
  private map = new Map<string, { data: T; timestamp: number }>();
  private ttl: number;

  constructor(ttlMs: number) {
    this.ttl = ttlMs;
  }

  get(key: string): T | null {
    const entry = this.map.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > this.ttl) {
      this.map.delete(key);
      return null;
    }
    return entry.data;
  }

  set(key: string, data: T): void {
    this.map.set(key, { data, timestamp: Date.now() });
  }

  clear(): void {
    this.map.clear();
  }
}
