import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-cookies-login',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './cookies-login.component.html',
  styleUrl: './cookies-login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookiesLoginComponent {}
