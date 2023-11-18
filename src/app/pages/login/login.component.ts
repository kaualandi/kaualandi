import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { zoomInAnimation } from 'src/app/animations/route-animation';
import { CookiesLoginComponent } from 'src/app/components/modals/cookies-login/cookies-login.component';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [zoomInAnimation],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public storage: StorageService,
    private authService: AuthService,
    public router: Router
  ) {}

  loading = false;
  view_pass = false;

  login_form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false],
  });

  ngOnInit(): void {
    this.awaitRemember();
  }

  loginSubmitHandler() {
    if (this.login_form.invalid) {
      this.login_form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const email: string = this.login_form.value.email as string;
    const password: string = this.login_form.value.password as string;
    const remember: boolean = this.login_form.value.remember as boolean;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.loading = false;
        this.storage.setToken(response.token, remember);
        this.router.navigate(['/']);
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  awaitRemember() {
    this.login_form.get('remember')?.valueChanges.subscribe((value) => {
      if (!value) return;

      if (!this.storage.cookies) {
        this.openCookieDialog();
      }
    });
  }

  openCookieDialog() {
    const dialogRef = this.dialog.open(CookiesLoginComponent, {
      panelClass: 'cookies-dialog',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.storage.cookies = true;
      } else {
        this.login_form.get('remember')?.setValue(false);
      }
    });
  }
}
