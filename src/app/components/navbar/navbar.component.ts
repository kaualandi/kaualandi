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
import {
  offcanvasTopAnimation,
  slideInAnimation,
} from '@app/animations/route-animation';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { LangSelectComponent } from '../shared/lang-select/lang-select.component';
import { PageErrorComponent } from '../shared/page-error/page-error.component';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule, LangSelectComponent, PageErrorComponent],
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
    this.onWindowScroll();
    this.loading = true;

    // this.getMe();

    this.user$.subscribe({
      next: () => {
        this.getMe();
      },
    });
  }

  private getMe() {
    this.error = 0;
    this.authService.getMe().subscribe({
      next: () => {
        this.loading = false;
      },
      error: () => {
        // ! ⬆ Adicione o parametro error aqui para que o erro seja capturado
        // this.error = error.status; // ! Descomente esta linha para que o erro seja exibido
        this.loading = false;
      },
    });
  }

  public toggleNavbarVisibility() {
    console.log('toggleNavbarVisibility');
    this.navbar_hidden = !this.navbar_hidden;
  }

  @HostListener('window:scroll', ['$event'])
  private onWindowScroll() {
    if (isPlatformServer(this.plataformId)) return;
    const scroll = window.scrollY;
    this.scroll = scroll > 200;
  }
}
