// Modules
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SharedModule } from '../../../shared/shared.module';

// Services
import { DataService } from '../../../shared/services/data.service';

// Components
import { testData } from '../../test-data';
import { ClosedProjectsComponent } from './closed-projects.component';

describe('ClosedProjectsComponent', () => {
  let component: ClosedProjectsComponent;
  let fixture: ComponentFixture<ClosedProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedProjectsComponent ],
      imports: [ SharedModule, RouterTestingModule ],
      providers: [ DataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedProjectsComponent);
    component = fixture.componentInstance;
    const dataService = fixture.debugElement.injector.get(DataService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
