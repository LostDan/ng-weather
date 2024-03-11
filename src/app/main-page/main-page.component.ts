import { Component } from "@angular/core";
import { CurrentConditionsComponent } from "../current-conditions/current-conditions.component";
import { ZipcodeEntryComponent } from "../zipcode-entry/zipcode-entry.component";

@Component({
  selector: "app-main-page",
  standalone: true,
  imports: [CurrentConditionsComponent, ZipcodeEntryComponent],
  templateUrl: "./main-page.component.html",
})
export class MainPageComponent {}
