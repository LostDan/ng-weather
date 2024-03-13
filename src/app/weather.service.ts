import { DestroyRef, Injectable, Signal, inject, signal } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CacheService } from "./cache.service";
import { ConditionsAndZip } from "./conditions-and-zip.type";
import { CurrentConditions } from "./current-conditions/current-conditions.type";
import { Forecast } from "./forecasts-list/forecast.type";
import { LocationService } from "./location.service";

const CONDITION = "condition_";
const FORECAST = "forecast_";

@Injectable()
export class WeatherService {
  static URL = "http://api.openweathermap.org/data/2.5";
  static APPID = "5a4b2d457ecbef9eb2a71e480b947604";
  static ICON_URL =
    "https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/";
  private currentConditions = signal<ConditionsAndZip[]>([]);

  private locationService = inject(LocationService);
  private cacheService = inject(CacheService);
  private destroyRef = inject(DestroyRef);
  private httpClient = inject(HttpClient);

  constructor() {
    this.subscribeToLocationsChanges();
  }

  getWeatherIcon(id): string {
    if (id >= 200 && id <= 232)
      return WeatherService.ICON_URL + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return WeatherService.ICON_URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return WeatherService.ICON_URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return WeatherService.ICON_URL + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return WeatherService.ICON_URL + "art_clouds.png";
    else if (id === 741 || id === 761)
      return WeatherService.ICON_URL + "art_fog.png";
    else return WeatherService.ICON_URL + "art_clear.png";
  }

  // Adding error handler in case user searches for a non existing zipcode
  addCurrentConditions(zipcode: string): void {
    const cachedCondition: CurrentConditions = this.cacheService.getItem(
      CONDITION + zipcode
    )?.data;

    if (cachedCondition) {
      this.updateConditions(zipcode, cachedCondition);
      return;
    }
    // Here we make a request to get the current conditions data from the API. Note the use of backticks and an expression to insert the zipcode
    this.httpClient
      .get<CurrentConditions>(
        `${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`
      )
      .subscribe({
        next: (data) => {
          const condition: ConditionsAndZip = { zip: zipcode, data };
          this.saveInCache(CONDITION + zipcode, condition);
          this.updateConditions(zipcode, data);
        },
        error: (error: HttpErrorResponse) => {
          this.locationService.removeLocation(zipcode);
          throw error;
        },
      });
  }

  removeCurrentConditions(zipcode: string) {
    this.currentConditions.update((conditions) => {
      for (let i in conditions) {
        if (conditions[i].zip == zipcode) conditions.splice(+i, 1);
      }
      return conditions;
    });
  }

  getCurrentConditions(): Signal<ConditionsAndZip[]> {
    return this.currentConditions.asReadonly();
  }

  getForecast(zipcode: string): Observable<Forecast> {
    const cachedForecast: Forecast = this.cacheService.getItem(
      FORECAST + zipcode
    );

    if (cachedForecast) {
      return of(cachedForecast);
    }
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.httpClient
      .get<Forecast>(
        `${WeatherService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherService.APPID}`
      )
      .pipe(tap((forecast) => this.saveInCache(FORECAST + zipcode, forecast)));
  }

  private updateConditions(zip: string, data: CurrentConditions) {
    this.currentConditions.update((conditions) => [
      ...conditions,
      { zip, data },
    ]);
  }

  private saveInCache<T>(key: string, data: T) {
    this.cacheService.setCachedItem(key, data);
  }

  private subscribeToLocationsChanges() {
    this.locationService.locations$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((locations) => {
          const uniqueLocations = [...new Set(locations)];

          for (let loc of uniqueLocations) {
            const existingCondition = this.currentConditions().some(
              (cond) => cond.zip === loc
            );
            if (!existingCondition) this.addCurrentConditions(loc);
          }

          for (let cond of this.currentConditions())
            if (!locations.some((loc) => loc === cond.zip))
              this.removeCurrentConditions(cond.zip);
        })
      )
      .subscribe();
  }
}
