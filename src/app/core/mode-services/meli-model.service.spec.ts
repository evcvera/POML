import { TestBed } from '@angular/core/testing';

import { MeliModelService } from './meli-model.service';

describe('MeliModelService', () => {
  let service: MeliModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeliModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
