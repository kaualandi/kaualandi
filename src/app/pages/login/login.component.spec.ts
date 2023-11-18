import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CookiesLoginComponent } from 'src/app/components/modals/cookies-login/cookies-login.component';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let storageService: StorageService;
  let httpServiceMock: Partial<HttpService>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    httpServiceMock = {
      post: jasmine.createSpy('post'),
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent, CookiesLoginComponent],
      providers: [
        { provide: HttpService, useValue: httpServiceMock },
        StorageService,
      ],
      imports: [MatDialogModule, ReactiveFormsModule, MatCheckboxModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    storageService = TestBed.inject(StorageService);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be disable the login button if the form is invalid', () => {
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    component.login_form.controls.email.setValue('');
    component.login_form.controls.password.setValue('');
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTrue();
  });

  it('should be enable the login button if the form is valid', () => {
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    component.login_form.controls.email.setValue('test@example.com');
    component.login_form.controls.password.setValue('password');
    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalse();
  });

  // ? Deve ser exibido a caixa de diálogo de cookies quando "Lembrar-me" é ativado e não foi permitido o uso de cookies
  it('should be displayed the cookie dialog when "Remember Me" is enabled and cookies have not been enabled', () => {
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of(false),
    } as MatDialogRef<CookiesLoginComponent>);
    spyOnProperty(component.storage, 'cookies', 'get').and.returnValue(false);
    component.login_form.get('remember')?.setValue(true);
    component.openCookieDialog();
    fixture.detectChanges();
    expect(component.dialog.open).toHaveBeenCalledWith(CookiesLoginComponent, {
      panelClass: 'cookies-dialog',
      disableClose: true,
    });
  });

  // ? Deve ser armazenado os cookies se a caixa de diálogo de cookies for confirmada
  it('should be stored cookies if the cookie dialog is confirmed', () => {
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of(true),
    } as MatDialogRef<CookiesLoginComponent>);
    component.openCookieDialog();
    expect(storageService.cookies).toBeTrue();
  });

  // ? Deve ser desmarcada a opção "Lembrar-me" se a caixa de diálogo de cookies for cancelada
  it('should be uncheck the "Remember me" option if the cookie dialog is canceled', () => {
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of(false),
    } as MatDialogRef<CookiesLoginComponent>);
    component.openCookieDialog();
    expect(component.login_form.controls.remember.value).toBeFalse();
  });

  // ? Deve apenas permitir que a opção "Lembrar-me" seja marcada se os cookies estiverem habilitados
  it('should only allow the "Remember me" option to be checked if cookies are enabled', () => {
    storageService.cookies = true;
    component.login_form.controls.remember.setValue(true);
    expect(component.login_form.controls.remember.value).toBeTrue();
  });

  // ? Deve ser feito login sem lembrar e redirecionar para a página principal
  it('Should be logged in without remembering and redirecting to the main page', () => {
    spyOn(router, 'navigate');
    spyOn(authService, 'login').and.returnValue(of({ token: 'fake-token' }));

    component.login_form.patchValue({
      email: 'test@example.com',
      password: 'password',
      remember: false,
    });

    component.loginSubmitHandler();

    expect(component.loading).toBe(false);
    expect(authService.login).toHaveBeenCalledWith(
      'test@example.com',
      'password'
    );
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  // ? Não deve ser feito login se o formulário for inválido
  it('Should not be logged in if the form is invalid', () => {
    spyOn(authService, 'login');

    component.login_form.patchValue({
      email: '',
      password: 'password',
      remember: true,
    });

    component.loginSubmitHandler();

    expect(component.loading).toBe(false);
    expect(authService.login).not.toHaveBeenCalled();
  });
});
