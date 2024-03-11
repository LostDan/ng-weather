import { CommonModule } from "@angular/common";
import { Component, inject, Signal } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { ConditionsAndZip } from "../conditions-and-zip.type";
import { LocationService } from "../location.service";
import { TabDirective } from "../tabs/tab.directive";
import { TabsComponent } from "../tabs/tabs.component";
import { WeatherService } from "../weather.service";

@Component({
  selector: "app-current-conditions",
  standalone: true,
  imports: [CommonModule, RouterModule, TabsComponent, TabDirective],
  templateUrl: "./current-conditions.component.html",
  styleUrls: ["./current-conditions.component.css"],
})
export class CurrentConditionsComponent {
  private weatherService = inject(WeatherService);
  private router = inject(Router);
  protected locationService = inject(LocationService);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> =
    this.weatherService.getCurrentConditions();

  showForecast(zipcode: string) {
    this.router.navigate(["/forecast", zipcode]);
  }
}
