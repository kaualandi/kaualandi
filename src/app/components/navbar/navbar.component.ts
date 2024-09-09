import { CommonModule, isPlatformServer } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {
  offcanvasTopAnimation,
  slideInAnimation,
} from '@app/animations/route-animation';
import { SOCIAL_LINKS_NAVBAR } from '@app/constants/social';
import { IconDirective } from '@app/directives/icon.directive';
import { TranslateModule } from '@ngx-translate/core';
import { LangSelectComponent } from '../shared/lang-select/lang-select.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    TranslateModule,
    LangSelectComponent,
    IconDirective,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [slideInAnimation, offcanvasTopAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  private plataformId = inject(PLATFORM_ID);

  public scroll = 0;
  public navbar_hidden = true;
  public socialLinks = SOCIAL_LINKS_NAVBAR;

  public ngOnInit(): void {
    if (isPlatformServer(this.plataformId)) return;
    this.onWindowScroll();
  }

  public toggleNavbarVisibility() {
    this.navbar_hidden = !this.navbar_hidden;
  }

  @HostListener('window:scroll', ['$event'])
  private onWindowScroll() {
    this.scroll = window.scrollY;
  }
}
