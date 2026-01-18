import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IndexedDbService {
  private dbName = 'app-db';
  private dbVersion = 1;
  private db!: IDBDatabase;

  async init() {
    if (this.db) return;

    this.db = await new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains('auth')) {
          db.createObjectStore('auth', { keyPath: 'key' });
        }
        if (!db.objectStoreNames.contains('cache')) {
          db.createObjectStore('cache', { keyPath: 'key' });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async set(store: 'auth' | 'cache', key: string, value: any) {
    await this.init();
    return new Promise<void>((resolve) => {
      const tx = this.db.transaction(store, 'readwrite');
      tx.objectStore(store).put({ key, value });
      tx.oncomplete = () => resolve();
    });
  }

  async get<T>(store: 'auth' | 'cache', key: string): Promise<T | null> {
    await this.init();
    return new Promise((resolve) => {
      const tx = this.db.transaction(store, 'readonly');
      const req = tx.objectStore(store).get(key);
      req.onsuccess = () => resolve(req.result?.value ?? null);
      req.onerror = () => resolve(null);
    });
  }

  async clear(store: 'auth' | 'cache') {
    await this.init();
    return new Promise<void>((resolve) => {
      const tx = this.db.transaction(store, 'readwrite');
      tx.objectStore(store).clear();
      tx.oncomplete = () => resolve();
    });
  }
}