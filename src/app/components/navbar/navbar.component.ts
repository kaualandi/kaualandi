import { CommonModule, isPlatformServer } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {
  offcanvasTopAnimation,
  slideInAnimation,
} from '@app/animations/route-animation';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { LangSelectComponent } from '../shared/lang-select/lang-select.component';
import { PageErrorComponent } from '../shared/page-error/page-error.component';
import { PageLoadingComponent } from '../shared/page-loading/page-loading.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    TranslateModule,
    LangSelectComponent,
    PageLoadingComponent,
    PageErrorComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [slideInAnimation, offcanvasTopAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  private storage = inject(StorageService);
  private authService = inject(AuthService);
  private plataformId = inject(PLATFORM_ID);

  public scroll = false;
  public navbar_hidden = true;
  public loading = false;
  public error = 0;
  private user$ = this.storage.watchUser().pipe(takeUntilDestroyed());

  public ngOnInit(): void {
    if (isPlatformServer(this.plataformId)) return;
    this.onWindowScroll();
  }

  public toggleNavbarVisibility() {
    this.navbar_hidden = !this.navbar_hidden;
  }

  @HostListener('window:scroll', ['$event'])
  private onWindowScroll() {
    const scroll = window.scrollY;
    this.scroll = scroll > 200;
  }
}
