import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { GRADIENTS } from '@app/constants/gradients';
import { InitialLettersDirective } from '@app/directives/initial-letters.directive';

@Component({
  selector: 'avatar',
  standalone: true,
  imports: [CommonModule, InitialLettersDirective],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnInit {
  @Input() public name = 'Foo Bar';
  @Input() public src = '';
  @Input() public length = 2;
  @Input() public bg = '';
  @Input() public color: 'dark' | 'light' | '' = '';

  private gradients = GRADIENTS;
  public gradient = this.gradients[0];

  public ngOnInit(): void {
    this.gradient =
      this.gradients[Math.floor(Math.random() * this.gradients.length)];

    this.color = this.color || this.gradient.color;
    this.bg = this.bg || this.gradient.bg;
  }
}
