import { Location } from '@angular/common';
import { Directive, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[prevPage]',
  standalone: true,
})
export class PrevPageDirective {
  private location = inject(Location);

  @HostListener('click', ['$event']) public goBack(evt: Event) {
    evt.stopPropagation();
    this.location.back();
  }
}
