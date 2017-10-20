import { TestBed, inject } from '@angular/core/testing';

import { GeolocationService } from './geolocation.service';
import { HttpClientModule } from '@angular/common/http';

describe('GeolocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeolocationService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([GeolocationService], (service: GeolocationService) => {
    expect(service).toBeTruthy();
  }));
});
