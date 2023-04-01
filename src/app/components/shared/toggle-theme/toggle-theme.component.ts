import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-toggle-theme',
  templateUrl: './toggle-theme.component.html',
  styleUrls: ['./toggle-theme.component.scss'],
})
export class ToggleThemeComponent {
  constructor(private storage: StorageService) {}

  theme = this.storage.theme;

  toggleTheme() {
    this.storage.toggleUserTheme();
    this.theme = this.storage.theme;
  }
}
