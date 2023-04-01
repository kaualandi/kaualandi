import { StorageService } from './../../services/storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(private storage: StorageService) {}

  loading = false;

  theme = 'light';

  ngOnInit(): void {
    this.getMe();
    this.theme = this.storage.theme;
    this.storage.watchUser().subscribe({
      next: () => {
        this.getMe();
      },
    });
    this.storage.watchTheme().subscribe({
      next: () => {
        this.theme = this.storage.theme;
      },
    });
  }

  ngOnDestroy(): void {
    this.storage.unwatchUser();
  }

  getMe() {
    // Requisição para pegar o usuário logado
    // if (error?.status === 401) {
    //   this.storageService.logout();
    // }
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}
