import { TestBed } from '@angular/core/testing';

import { RefreshAllModelService } from './refresh-all-model.service';

describe('RefreshAllModelService', () => {
  let service: RefreshAllModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshAllModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
