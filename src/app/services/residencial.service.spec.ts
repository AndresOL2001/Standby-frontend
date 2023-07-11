import { TestBed } from '@angular/core/testing';

import { ResidencialService } from './residencial.service';

describe('ResidencialService', () => {
  let service: ResidencialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResidencialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
