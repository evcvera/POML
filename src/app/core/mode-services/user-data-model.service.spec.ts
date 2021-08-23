import { TestBed } from '@angular/core/testing';

import { UserDataModelService } from './user-data-model.service';

describe('UserDataModelService', () => {
  let service: UserDataModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
