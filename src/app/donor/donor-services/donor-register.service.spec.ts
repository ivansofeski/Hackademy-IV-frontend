import { TestBed, inject } from '@angular/core/testing';

import { DonorRegisterService } from './donor-register.service';

describe('DonorRegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DonorRegisterService]
    });
  });

  it('should be created', inject([DonorRegisterService], (service: DonorRegisterService) => {
    expect(service).toBeTruthy();
  }));
});
