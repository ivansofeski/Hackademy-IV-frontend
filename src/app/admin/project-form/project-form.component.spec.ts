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

  it('should accept a normal project name ( My Project )',() => {
    component.projectControls.name.setValue(' My Project ');
    fixture.detectChanges();
    expect(component.projectControls.name.valid).toBe(true);
  });

  it('should now show an error message when a correct project name is supplied ( My Project )',() => {
    component.projectControls.name.setValue(' My Project ');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-primary')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.project-name mat-error'));
    expect(de).not.toBeTruthy();
  });

  it('should not accept an empty project ID',() => {
    component.projectControls.projectId.setValue(' ');
    fixture.detectChanges();
    expect(component.projectControls.projectId.valid).toBe(false);
  });

  it('should show an error message when an empty project ID is supplied',() => {
    component.projectControls.projectId.setValue(' ');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-primary')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.project-id mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('required');
  });

  it('should not accept a malformed project ID (12345643324)',() => {
    component.projectControls.projectId.setValue('12345643324');
    fixture.detectChanges();
    expect(component.projectControls.projectId.valid).toBe(false);
  });

  it('should now show an error message when a well formed project ID is supplied (12345643324)',() => {
    component.projectControls.projectId.setValue('12345643324');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-primary')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.project-id mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('XXXXXX-XXXX');
  });

  it('should accept a well formed project ID (123456-4332)',() => {
    component.projectControls.projectId.setValue('123456-4332');
    fixture.detectChanges();
    expect(component.projectControls.projectId.valid).toBe(true);
  });

  it('should now show an error message when a well formed project ID is supplied (123456-4332)',() => {
    component.projectControls.projectId.setValue('123456-4332');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-primary')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.project-id mat-error'));
    expect(de).not.toBeTruthy();
  });


  it('should not accept an empty project manager',() => {
    component.projectControls.manager.setValue(' ');
    fixture.detectChanges();
    expect(component.projectControls.manager.valid).toBe(false);
  });

  it('should show an error message when an empty project manager is supplied',() => {
    component.projectControls.manager.setValue(' ');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-primary')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.project-manager mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('required');
  });

  it('should accept a normal project manager ( Super Hero )',() => {
    component.projectControls.manager.setValue(' Super Hero ');
    fixture.detectChanges();
    expect(component.projectControls.manager.valid).toBe(true);
  });

  it('should now show an error message when a correct project name is supplied ( Super Hero )',() => {
    component.projectControls.manager.setValue(' Super Hero ');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-primary')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.project-manager mat-error'));
    expect(de).not.toBeTruthy();
  });


});
