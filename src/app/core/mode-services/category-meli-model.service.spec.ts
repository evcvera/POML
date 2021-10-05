import { TestBed } from '@angular/core/testing';

import { CategoryMeliModelService } from './category-meli-model.service';

describe('CategoryMeliModelService', () => {
  let service: CategoryMeliModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryMeliModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
