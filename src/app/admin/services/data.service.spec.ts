import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { DataService } from './data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        HttpClient,
        HttpHandler,
        DataService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  describe('get object', () => {
    /* it('loadData.organizations() should return data from organizations.json',
      inject([DataService, XHRBackend], (service, mockBackend) => {
        service.loadData.organizations().subscribe((data) => {
          expect(data.length).toBe(2);
        });
      })); */

      /* it('loadData.projects() should return data from organizations.json',
      inject([DataService, XHRBackend], (service, mockBackend) => {
        service.get.projects().subscribe((data) => {
          expect(data.length).toBe(2);
        });
      })); */
  });

});
