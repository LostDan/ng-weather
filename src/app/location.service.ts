import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CacheService } from "./cache.service";

export const LOCATIONS: string = "locations";

@Injectable()
export class LocationService {
  locations$: Observable<string[]>;

  private locations = new BehaviorSubject<string[]>([]);

  private cacheService = inject(CacheService);

  constructor() {
    this.locations$ = this.locations.asObservable();

    let locations = this.cacheService.getItem(LOCATIONS);
    if (locations) {
      this.locations.next(locations);
    }
  }

  addLocation(zipcode: string) {
    const addedLocations = [...this.locations.value, zipcode];
    this.cacheService.setItem(LOCATIONS, addedLocations);
    this.locations.next(addedLocations);
  }

  removeLocation(zipcode: string) {
    const filteredLocations = this.locations.value.filter(
      (loc) => loc !== zipcode
    );
    this.cacheService.setItem(LOCATIONS, filteredLocations);
    this.locations.next(filteredLocations);
  }
}
