import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'page-error',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './page-error.component.html',
  styleUrl: './page-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageErrorComponent implements OnInit, OnChanges {
  @Input() public code = 0;
  private route = inject(ActivatedRoute);

  public translated = 'default';

  public ngOnInit() {
    this.code ||= this.route.snapshot.data['code'];
    this.translated = [500, 404, 403, 401, 400].includes(this.code)
      ? this.code.toString()
      : 'default';
  }

  public ngOnChanges() {
    this.ngOnInit();
  }
}
