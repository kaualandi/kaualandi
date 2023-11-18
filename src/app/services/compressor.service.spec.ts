import { TestBed } from '@angular/core/testing';

import { CompressorService } from './compressor.service';

describe('CompressorService', () => {
  let service: CompressorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompressorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
