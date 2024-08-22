import { isPlatformServer } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator } from '@angular/material/paginator';
import {
  offcanvasTopAnimation,
  slideInAnimation,
} from '@app/animations/route-animation';
import { tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { LangSelectComponent } from '../shared/lang-select/lang-select.component';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule, LangSelectComponent, MatPaginator],
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
    this.getMe();

    this.user$.subscribe({
      next: () => {
        this.getMe();
      },
    });
  }

  private getMe() {
    this.authService
      .getMe()
      .pipe(
        tap(() => {
          this.loading = true;
        })
      )
      .subscribe({
        next: () => {
          this.loading = false;
        },
        error: (error) => {
          this.error = error?.status || 500;
          console.log(this.error);
          if (this.error === 401) {
            this.authService.logout();
          }
          this.loading = false;
        },
      });
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
