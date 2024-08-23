import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconDirective } from '@app/directives/icon.directive';
import { ZoomableDirective } from '@app/directives/zoomable.directive';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IconDirective, ZoomableDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public loading$ = interval(1000).pipe(map((i) => i % 2 === 0));
}
