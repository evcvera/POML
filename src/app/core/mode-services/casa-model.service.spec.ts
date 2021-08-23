import { TestBed } from '@angular/core/testing';

import { CasaModelService } from './casa-model.service';

describe('CasaModelService', () => {
  let service: CasaModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasaModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
