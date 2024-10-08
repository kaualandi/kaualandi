import { isPlatformServer } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  public firstStepClass = signal('');
  public secondStepClass = signal('');
  public secondStepPClass = signal('');
  public responsiveClass = signal('');

  public constructor() {}

  public ngAfterViewInit() {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    this.onResize();
    setTimeout(() => {
      this.firstStepClass.set('enter');
    }, 1000);

    setTimeout(() => {
      this.firstStepClass.set('leave');
    }, 2500);

    setTimeout(() => {
      this.secondStepClass.set('enter');
    }, 3000);

    setTimeout(() => {
      this.secondStepPClass.set('enter');
    }, 3500);

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 4500);
  }

  @HostListener('window:resize', ['$event'])
  public onResize() {
    let responsiveClass = '';

    if (window.innerWidth < 970) {
      responsiveClass = 'tablet';
    }

    if (window.innerWidth < 650) {
      responsiveClass = 'phone';
    }

    this.responsiveClass.set(responsiveClass);
  }
}
