import { TestBed } from '@angular/core/testing';

import { PriceTypeModelService } from './price-type-model.service';

describe('PriceTypeModelService', () => {
  let service: PriceTypeModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceTypeModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
