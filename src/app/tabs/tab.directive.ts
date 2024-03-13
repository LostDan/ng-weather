import { Directive, ElementRef, Input, TemplateRef } from "@angular/core";

@Directive({
  selector: "[tab]",
  standalone: true,
})
export class TabDirective {
  @Input() title = "title";
  @Input({ required: true }) templateRef!: TemplateRef<ElementRef>;
  @Input() content;
}
