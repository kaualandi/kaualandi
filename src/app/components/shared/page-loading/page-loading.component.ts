import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-loading',
  standalone: true,
  imports: [],
  templateUrl: './page-loading.component.html',
  styleUrl: './page-loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLoadingComponent {}
