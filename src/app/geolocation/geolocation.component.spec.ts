import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocationComponent } from './geolocation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { ProjectService } from '../projects/project.service';
import { HttpClientModule } from '@angular/common/http';

describe('GeolocationComponent', () => {
  let component: GeolocationComponent;
  let fixture: ComponentFixture<GeolocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeolocationComponent ],
      imports:[RouterTestingModule,AgmCoreModule, HttpClientModule],
      providers: [ ProjectService,MapsAPILoader ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
