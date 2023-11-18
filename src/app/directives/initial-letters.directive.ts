import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[initialLetters]',
})
export class InitialLettersDirective implements OnInit {
  @Input() initialLetters = 'Foo Bar';
  @Input() length = 2;

  constructor(private elementRef: ElementRef) {}

  linkingPrepositions = ['de', 'da', 'do', 'das', 'dos', 'e'];

  ngOnInit() {
    this.removeLinkingPrepositions();
    const initials = this.initialLetters.split(' ').map((word) => word[0]);
    const letters = initials.slice(0, this.length).join('');
    this.initialLetters = letters.toUpperCase();
    const span = this.elementRef.nativeElement;
    span.innerHTML = this.initialLetters;
  }

  removeLinkingPrepositions() {
    this.initialLetters = this.initialLetters
      .split(' ')
      .filter((word) => !this.linkingPrepositions.includes(word.toLowerCase()))
      .join(' ');
  }
}
