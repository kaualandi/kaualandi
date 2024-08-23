import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { zoomInAnimation } from '@app/animations/route-animation';
import { CookiesLoginComponent } from '@app/components/modals/cookies-login/cookies-login.component';
import { ForgotPasswordComponent } from '@app/components/modals/forgot-password/forgot-password.component';
import { LangSelectComponent } from '@app/components/shared/lang-select/lang-select.component';
import { IconDirective } from '@app/directives/icon.directive';
import { FormErrorPipe } from '@app/pipes/form-error.pipe';
import { AuthService } from '@app/services/auth.service';
import { BodyJson } from '@app/services/http.service';
import { StorageService } from '@app/services/storage.service';
import { environment } from '@env';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatDialogModule,
    TranslateModule,
    ReactiveFormsModule,
    LangSelectComponent,
    MatFormFieldModule,
    FormErrorPipe,
    IconDirective,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [zoomInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private storage = inject(StorageService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  public loading = signal(false);
  public view_pass = false;

  public version = environment.version;

  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false],
  });

  public ngOnInit(): void {
    this.awaitRemember();
  }

  public loginSubmitHandler() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const body = this.form.value as BodyJson;
    this.authService.login(body).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.authService.setToken(response.token, body['remember'] as boolean);
        this.router.navigate(['/']);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  private awaitRemember() {
    this.form.get('remember')?.valueChanges.subscribe((value) => {
      if (!value) return;

      if (!this.storage.cookies) {
        this.openCookieDialog();
      }
    });
  }

  public handleOpenForgotPasswordModal() {
    this.dialog.open(ForgotPasswordComponent, {
      data: { email: this.form.get('email')?.value },
    });
  }

  private openCookieDialog() {
    const dialogRef = this.dialog.open(CookiesLoginComponent, {
      panelClass: 'cookies-dialog',
      disableClose: true,
      maxWidth: '320px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.storage.cookies = true;
      } else {
        this.form.get('remember')?.setValue(false);
      }
    });
  }
}
