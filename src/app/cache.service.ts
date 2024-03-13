import { Injectable, inject } from "@angular/core";
import { CACHE_TIME } from "./app.module";

@Injectable()
export class CacheService {
  cacheTime: number = inject(CACHE_TIME);

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

  // This is used to handle the timer during the session to test the cache
  setCacheTimer(seconds: number) {
    this.cacheTime = seconds;
  }
}
