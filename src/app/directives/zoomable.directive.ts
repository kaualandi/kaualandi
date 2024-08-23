import { isPlatformServer } from '@angular/common';
import { Directive, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import mediumZoom from 'medium-zoom';

@Directive({
  selector: '[zoomable]',
  standalone: true,
})
export class ZoomableDirective {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  public constructor() {
    if (isPlatformServer(this.platformId)) return;
    mediumZoom(this.el.nativeElement, {
      background: 'var(--medium-zoom-overlay-bg)',
    });
  }
}
