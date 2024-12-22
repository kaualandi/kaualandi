import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'kaua-horizontal-scroll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horizontal-scroll.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalScrollComponent implements OnInit {
  @Input() public speed = 1000;
  @Input() public items: unknown[] = [];
  @Input() public itemTemplate!: TemplateRef<unknown>;
  @Input() public height = '';

  public ngOnInit(): void {
    if (!this.itemTemplate) {
      throw new Error('itemTemplate is required but not provided.');
    }
  }
}
