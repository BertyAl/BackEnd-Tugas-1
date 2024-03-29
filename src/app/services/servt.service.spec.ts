import { TestBed } from '@angular/core/testing';

import { ServtService } from './servt.service';

describe('ServtService', () => {
  let service: ServtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
