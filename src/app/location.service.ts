import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export const LOCATIONS: string = "locations";

@Injectable()
export class LocationService {
  locations$: Observable<string[]>;

  private locations = new BehaviorSubject<string[]>([]);

  constructor() {
    this.locations$ = this.locations.asObservable();

    let locString = localStorage.getItem(LOCATIONS);
    if (locString) {
      this.locations.next(JSON.parse(locString));
    }
  }

  addLocation(zipcode: string) {
    if (this.locations.value.some((loc) => loc === zipcode)) {
      return;
    }
    const addedLocations = [...this.locations.value, zipcode];
    this.locations.next(addedLocations);
    localStorage.setItem(LOCATIONS, JSON.stringify(addedLocations));
  }

  removeLocation(zipcode: string) {
    const locationsValue = this.locations.value;

    this.locations.next(locationsValue.filter((loc) => loc !== zipcode));
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations.value));
  }
}
