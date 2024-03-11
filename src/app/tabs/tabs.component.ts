import { CommonModule } from "@angular/common";
import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Output,
  QueryList,
} from "@angular/core";
import { TabDirective } from "./tab.directive";

@Component({
  selector: "app-tabs",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./tabs.component.html",
  styleUrl: "./tabs.component.scss",
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabDirective) tabs!: QueryList<TabDirective>;

  @Output() removedTab = new EventEmitter<TabDirective>();
  activeComponent!: TabDirective;

  ngAfterContentInit() {
    this.activeComponent = this.tabs.first;
  }

  removeTab(tab: TabDirective, index: number) {
    this.removedTab.emit(tab);
    if (tab === this.activeComponent) {
      if (index > 0) {
        this.activeComponent = this.tabs.toArray()[index - 1];
      } else {
        this.activeComponent = this.tabs.toArray()[1];
      }
    }
  }

  activateTab(tab: TabDirective) {
    this.activeComponent = tab;
  }
}
