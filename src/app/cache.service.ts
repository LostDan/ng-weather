import { Injectable, inject } from "@angular/core";
import { CACHE_TIME } from "./app.module";

@Injectable()
export class CacheService {
  private cacheTime: number = inject(CACHE_TIME);

  getItem(key: string) {
    const item = JSON.parse(localStorage.getItem(key));
    // cacheTime * 1000 to convert the time in seconds
    const expiredCache = Date.now() - item?.timeCached > this.cacheTime * 1000;

    if ((item && !expiredCache) || !item?.timeCached) {
      return item;
    }

    return null;
  }

  setCachedItem<T>(key: string, data: T) {
    const item = JSON.stringify({ ...data, timeCached: Date.now() });
    localStorage.setItem(key, item);
  }

  setItem<T>(key: string, data: T) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
