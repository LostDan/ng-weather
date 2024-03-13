import { InjectionToken, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { CacheService } from "./cache.service";
import { LocationService } from "./location.service";
import { WeatherService } from "./weather.service";

export const CACHE_TIME = new InjectionToken<number>("cacheTime");
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    routing,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [
    LocationService,
    WeatherService,
    CacheService,
    // Change this value to modify the amount of seconds items will be cached
    { provide: CACHE_TIME, useValue: 7200 },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
