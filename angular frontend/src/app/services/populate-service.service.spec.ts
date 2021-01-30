import { TestBed } from '@angular/core/testing';

import { PopulateServiceService } from './populate-service.service';

describe('PopulateServiceService', () => {
  let service: PopulateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopulateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
