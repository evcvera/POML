import { TestBed } from '@angular/core/testing';

import { WeatherModelService } from './weather-model.service';

describe('WeatherModelService', () => {
  let service: WeatherModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
