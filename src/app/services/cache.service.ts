import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: Map<string, any> = new Map();

  constructor() {}

  // Store data in cache
  storeData(key: string, data: any) {
    this.cache.set(key, data);
  }

  // Retrieve data from cache
  getData(key: string) {
    return this.cache.get(key);
  }

  // Clear cached data
  clearCache(key: string) {
    this.cache.delete(key);
  }
}
