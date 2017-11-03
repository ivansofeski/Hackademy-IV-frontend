import { TestBed, inject } from '@angular/core/testing';

import { GeolocationService } from './geolocation.service';
import { HttpClientModule } from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';

describe('GeolocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeolocationService, MapsAPILoader],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([GeolocationService], (service: GeolocationService) => {
    expect(service).toBeTruthy();
  }));
});
