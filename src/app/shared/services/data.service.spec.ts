import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpModule, XHRBackend } from '@angular/http';
import { HttpClient, HttpHandler } from '@angular/common/http';


describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        HttpClient,
        HttpHandler,
        DataService
      ]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});
