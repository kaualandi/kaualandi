import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'page-error',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    TranslateModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
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
