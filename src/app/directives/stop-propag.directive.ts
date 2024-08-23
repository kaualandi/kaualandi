import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[stopPropag]',
  standalone: true,
})
export class StopPropagDirective {
  @HostListener('click', ['$event'])
  public onClick(e: Event): void {
    e.stopPropagation();
  }
}
