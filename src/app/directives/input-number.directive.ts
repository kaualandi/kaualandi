import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

interface IIcon {
  [key: string]: string;
}

@Directive({
  selector: 'input[type="number"]',
})
export class InputNumberDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const el = this.el as ElementRef<HTMLInputElement>;
    const input = el.nativeElement as HTMLInputElement;

    const div = this.renderer.createElement('div');
    const minusButton = this.createButton('minus');
    const plusButton = this.createButton('plus');
    this.renderer.addClass(div, 'number_buttons');
    this.renderer.appendChild(div, plusButton);
    this.renderer.appendChild(div, minusButton);

    this.renderer.insertBefore(input.parentElement, div, input, false);

    this.renderer.listen(plusButton, 'click', () => {
      input.value = String(parseInt(input.value) + 1);
    });
    this.renderer.listen(minusButton, 'click', () => {
      input.value = String(parseInt(input.value) - 1);
    });
  }

  createButton(icon: string) {
    const button = this.renderer.createElement('button');
    this.renderer.addClass(button, 'mat-icon-button');
    this.renderer.addClass(button, icon);
    const iconElement = this.renderer.createElement('i');
    const svgString = this.icons[icon];
    this.renderer.setProperty(iconElement, 'innerHTML', svgString);
    this.renderer.appendChild(button, iconElement);
    return button;
  }

  icons: IIcon = {
    minus: `<svg class="svg-inline--fa fa-circle-minus" aria-hidden="true" focusable="false" data-prefix="far" data-icon="circle-minus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M344 232C357.3 232 368 242.7 368 256C368 269.3 357.3 280 344 280H168C154.7 280 144 269.3 144 256C144 242.7 154.7 232 168 232H344zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"></path></svg>`,
    plus: `<svg class="svg-inline--fa fa-circle-plus" aria-hidden="true" focusable="false" data-prefix="far" data-icon="circle-plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M232 344V280H168C154.7 280 144 269.3 144 256C144 242.7 154.7 232 168 232H232V168C232 154.7 242.7 144 256 144C269.3 144 280 154.7 280 168V232H344C357.3 232 368 242.7 368 256C368 269.3 357.3 280 344 280H280V344C280 357.3 269.3 368 256 368C242.7 368 232 357.3 232 344zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"></path></svg>`,
  };
}
