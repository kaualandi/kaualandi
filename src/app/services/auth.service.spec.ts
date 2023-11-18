import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpServiceMock: Partial<HttpService>;

  beforeEach(() => {
    httpServiceMock = {
      post: jasmine.createSpy('post'),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: HttpService, useValue: httpServiceMock }],
    });

    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  // ? Deve ser chamada uma requisição post com os parâmetros corretos
  it('should be called a post request with the correct parameters', () => {
    const email = 'example@example.com';
    const password = 'password';

    authService.login(email, password);

    expect(httpServiceMock.post).toHaveBeenCalledWith(
      'auth/login',
      jasmine.any(Object)
    );
  });

  // Other tests for AuthService
});
