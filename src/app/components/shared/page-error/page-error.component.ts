import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'page-error',
  standalone: true,
  imports: [],
  templateUrl: './page-error.component.html',
  styleUrl: './page-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageErrorComponent {
  @Input() public code = 0;
}
