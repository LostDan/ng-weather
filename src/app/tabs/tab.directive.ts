import { Directive, ElementRef, Input, TemplateRef } from "@angular/core";

interface Content {
  title?: string;
  description?: string;
}

@Directive({
  selector: "[tab]",
  standalone: true,
})
export class TabDirective {
  @Input() title = "title";
  @Input({ required: true }) templateRef!: TemplateRef<ElementRef>;
  @Input() content: Content;
}
