import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocationComponent } from './geolocation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AgmCoreModule } from '@agm/core';
import { ProjectService } from '../projects/project.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

describe('GeolocationComponent', () => {
  let component: GeolocationComponent;
  let fixture: ComponentFixture<GeolocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports:[RouterTestingModule, 
        HttpClientModule,
        SharedModule,
        AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCHC4hLZ_ogiMaGy9kVZl4u0gjocEyw3EA'
      })],
      providers: [ ProjectService ]
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
