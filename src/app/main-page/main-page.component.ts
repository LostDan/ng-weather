import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { CacheConfigurationComponent } from "app/cache-configuration/cache-configuration.component";
import { CurrentConditionsComponent } from "../current-conditions/current-conditions.component";
import { ZipcodeEntryComponent } from "../zipcode-entry/zipcode-entry.component";

@Component({
  selector: "app-main-page",
  standalone: true,
  imports: [
    CurrentConditionsComponent,
    ZipcodeEntryComponent,
    CommonModule,
    CacheConfigurationComponent,
  ],
  templateUrl: "./main-page.component.html",
})
export class MainPageComponent {}
