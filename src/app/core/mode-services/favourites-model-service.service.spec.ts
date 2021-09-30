import { TestBed } from '@angular/core/testing';

import { FavouritesModelServiceService } from './favourites-model-service.service';

describe('FavouritesModelServiceService', () => {
  let service: FavouritesModelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouritesModelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
