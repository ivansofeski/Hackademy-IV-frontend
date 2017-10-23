import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocationComponent } from './geolocation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

// Services
import { LocalStorageService } from '../service/local-storage.service';
import { ProjectService } from '../projects/project.service';

describe('GeolocationComponent', () => {
  let component: GeolocationComponent;
  let fixture: ComponentFixture<GeolocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        SharedModule
      ],
      providers: [ ProjectService, LocalStorageService ]
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
