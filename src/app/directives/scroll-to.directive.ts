import { Directive, HostListener, inject, Input } from '@angular/core';
import { Router } from 'express';

@Directive({
  selector: '[scrollTo]',
  standalone: true,
})
export class ScrollToDirective {
  @Input() public scrollTo = '';
  @Input() public scrollToRouter: string | undefined;

  private router = inject(Router);

  @HostListener('click') public onClick() {
    if (this.scrollToRouter && this.scrollToRouter !== this.router.url) {
      this.router.navigate([this.scrollToRouter]).then(() => {
        const element = document.querySelector('#' + this.scrollTo);
        setTimeout(() => {
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 650);
      });
      return;
    }

    const element = document.querySelector('#' + this.scrollTo);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
