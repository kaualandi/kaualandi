import { Directive, ElementRef, inject } from '@angular/core';
import mediumZoom from 'medium-zoom';

@Directive({
  selector: '[zoomable]',
  standalone: true,
})
export class ZoomableDirective {
  private el = inject(ElementRef);
  public constructor() {
    mediumZoom(this.el.nativeElement);
  }
}
