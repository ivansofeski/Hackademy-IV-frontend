import { TestBed, inject } from '@angular/core/testing';

import { DonorOverviewService } from './donor-overview.service';
import {HttpClientModule} from '@angular/common/http';

describe('DonorOverviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DonorOverviewService],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([DonorOverviewService], (service: DonorOverviewService) => {
    expect(service).toBeTruthy();
  }));
});
