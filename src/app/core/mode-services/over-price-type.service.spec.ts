import { TestBed } from '@angular/core/testing';

import { OverPriceTypeService } from './over-price-type.service';

describe('OverPriceTypeService', () => {
  let service: OverPriceTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverPriceTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
