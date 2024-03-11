import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { WeatherService } from "../weather.service";
import { Forecast } from "./forecast.type";

@Component({
  selector: "app-forecasts-list",
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: "./forecasts-list.component.html",
  styleUrls: ["./forecasts-list.component.css"],
})
export class ForecastsListComponent {
  zipcode: string;
  forecast: Forecast;

  constructor(protected weatherService: WeatherService, route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.zipcode = params["zipcode"];
      weatherService
        .getForecast(this.zipcode)
        .subscribe((data) => (this.forecast = data));
    });
  }
}
