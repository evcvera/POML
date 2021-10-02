import { TestBed } from '@angular/core/testing';

import { CartModelService } from './cart-model.service';

describe('CartModelService', () => {
  let service: CartModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
