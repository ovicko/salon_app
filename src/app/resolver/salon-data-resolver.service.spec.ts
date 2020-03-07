import { TestBed } from '@angular/core/testing';

import { SalonDataResolverService } from './salon-data-resolver.service';

describe('SalonDataResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalonDataResolverService = TestBed.get(SalonDataResolverService);
    expect(service).toBeTruthy();
  });
});
