import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HttpService } from './http.service';
import { SnackbarService } from './snackbar.service';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: SnackbarService, useValue: {} }],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
