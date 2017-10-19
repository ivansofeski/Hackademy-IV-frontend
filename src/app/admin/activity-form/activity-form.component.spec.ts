import { Activity } from './../../projects/activity.interface';
import { testData } from './../test-data';
import { Observable } from 'rxjs/Observable';
import { ActivitiesService } from './../services/activities.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityFormComponent } from './activity-form.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



describe('ActivityFormComponent', () => {
  let component: ActivityFormComponent;
  let fixture: ComponentFixture<ActivityFormComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  let button:  HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityFormComponent ],
      imports: [ SharedModule ],
      providers: [ ActivitiesService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let activitiesService = fixture.debugElement.injector.get(ActivitiesService);
    let spy = spyOn(activitiesService, 'getProjectActivities').and.returnValue(Observable.of(testData));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not accept an empty activity name', () => {
    component.activityControls.name.setValue(' ');
    fixture.detectChanges();
    expect(component.activityControls.name.valid).toBe(false);
  });

  it('should not accept an empty activity image', () => {
    component.activityControls.descImage.setValue(' ');
    fixture.detectChanges();
    expect(component.activityControls.descImage.valid).toBe(false);
  });
  it('should not accept an empty date ', () => {
    component.activityControls.activityDate.setValue(' ');
    fixture.detectChanges();
    expect(component.activityControls.activityDate.valid).toBe(false);
  });
  it('should not accept an empty description', () => {
    component.activityControls.desc.setValue(' ');
    fixture.detectChanges();
    expect(component.activityControls.desc.valid).toBe(false);
  });
});
