/* eslint-disable dot-notation */
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  NavigationCancel,
  NavigationError,
  Router,
  RouterState,
} from '@angular/router';
import { StorageService } from './services/storage.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs';

declare const gtag: (...args: any[]) => void;

interface Event_2 extends Event {
  urlAfterRedirects: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private storage: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    router.events.subscribe((event) => {
      this.navigationInterceptor(event);
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          gtag('event', 'page_view', {
            page_path: event.urlAfterRedirects,
          });
        }
      });

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const title: string = this.getTitle(
          router.routerState,
          router.routerState.root
        ).join(' > ');
        titleService.setTitle(title);
      }
    });
  }

  loadingDataImg = false;

  ngOnInit() {
    this.storage.loadCurrentTheme();
  }

  getTitle(state: RouterState, parent: ActivatedRoute): string[] {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data['title']) {
      data.push(parent.snapshot.data['title']);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, (state as any).firstChild(parent)));
    }
    return data;
  }

  navigationInterceptor(event: any): void {
    if (event instanceof NavigationStart) {
      this.loadingDataImg = true;
    }
    if (event instanceof NavigationEnd) {
      this.loadingDataImg = false;
    }

    if (event instanceof NavigationCancel) {
      this.loadingDataImg = false;
    }
    if (event instanceof NavigationError) {
      this.loadingDataImg = false;
    }
  }
}
