import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { By } from '@angular/platform-browser';

import { ProjectFormComponent } from './project-form.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '../services/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { testData } from '../test-data';

describe('ProjectFormComponent', () => {
  let component: ProjectFormComponent;
  let fixture: ComponentFixture<ProjectFormComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  let button:  HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectFormComponent ],
      imports: [ SharedModule ],
      providers: [ DataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFormComponent);
    component = fixture.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService,'getOrganizations').and.returnValue(Observable.of(testData.orgList));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not accept an empty project name',() => {
    component.projectControls.name.setValue(' ');
    fixture.detectChanges();
    expect(component.projectControls.name.valid).toBe(false);
  });

  it('should show an error message when an empty project name is supplied',() => {
    component.projectControls.name.setValue(' ');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-primary')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.project-name mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('required');
  });


});
