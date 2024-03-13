import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CacheService } from "app/cache.service";

@Component({
  selector: "app-cache-configuration",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./cache-configuration.component.html",
  styleUrl: "./cache-configuration.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CacheConfigurationComponent {
  cacheTime: number;
  private cacheService = inject(CacheService);

  setTimer(seconds: number) {
    this.cacheService.setCacheTimer(seconds);
  }
}
