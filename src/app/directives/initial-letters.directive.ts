import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[initialLetters]',
  standalone: true,
})
export class InitialLettersDirective implements OnInit {
  @Input() public initialLetters = 'Foo Bar';
  @Input() public length = 2;

  private elementRef = inject(ElementRef);

  private linkingPrepositions = ['de', 'da', 'do', 'das', 'dos', 'e'];

  public ngOnInit() {
    this.removeLinkingPrepositions();
    const initials = this.initialLetters.split(' ').map((word) => word[0]);
    const letters = initials.slice(0, this.length).join('');
    this.initialLetters = letters.toUpperCase();
    const span = this.elementRef.nativeElement;
    span.innerHTML = this.initialLetters;
  }

  private removeLinkingPrepositions() {
    this.initialLetters = this.initialLetters
      .split(' ')
      .filter((word) => !this.linkingPrepositions.includes(word.toLowerCase()))
      .join(' ');
  }
}
