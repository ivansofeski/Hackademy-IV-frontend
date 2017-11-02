import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { By } from '@angular/platform-browser';

import { ProjectFormComponent } from './project-form.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '../../shared/services/data.service';
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
    component.projectControls.name.markAsTouched();
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

  it('should not show an error message when a correct project name is supplied ( My Project )',() => {
    component.projectControls.name.setValue(' My Project ');
    fixture.detectChanges();
    component.projectControls.name.markAsTouched();
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
    component.projectControls.projectId.markAsTouched();
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

  it('should show an error message when a well formed project ID is supplied (12345643324)',() => {
    component.projectControls.projectId.setValue('12345643324');
    fixture.detectChanges();
    component.projectControls.projectId.markAsTouched();
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

  it('should not show an error message when a well formed project ID is supplied (123456-4332)',() => {
    component.projectControls.projectId.setValue('123456-4332');
    fixture.detectChanges();
    component.projectControls.projectId.markAsTouched();
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
    component.projectControls.manager.markAsTouched();
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

  it('should not show an error message when a correct project manager is supplied ( Super Hero )',() => {
    component.projectControls.manager.setValue(' Super Hero ');
    fixture.detectChanges();
    component.projectControls.manager.markAsTouched();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.project-manager mat-error'));
    expect(de).not.toBeTruthy();
  });

  it('should not accept an empty project address',() => {
    component.projectControls.address.setValue(' ');
    fixture.detectChanges();
    expect(component.projectControls.address.valid).toBe(false);
  });

  it('should show an error message when an empty project address is supplied',() => {
    component.projectControls.address.setValue(' ');
    fixture.detectChanges();
    component.projectControls.address.markAsTouched();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.project-address mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('required');
  });

  it('should accept a normal project address (somewhere 12, Malmö)',() => {
    component.projectControls.address.setValue('somewhere 12, Malmö');
    fixture.detectChanges();
    expect(component.projectControls.address.valid).toBe(true);
  });

  it('should not show an error message when a valid project address is supplied (somewhere 12, Malmö)',() => {
    component.projectControls.address.setValue('somewhere 12, Malmö');
    fixture.detectChanges();
    component.projectControls.address.markAsTouched();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.project-address mat-error'));
    expect(de).not.toBeTruthy();
  });

  it('should not accept an empty project start date',() => {
    component.projectControls.fromDate.setValue('');
    fixture.detectChanges();
    expect(component.projectControls.fromDate.valid).toBe(false);
  });

  it('should show an error message when an empty start date is supplied',() => {
    component.projectControls.fromDate.setValue('');
    fixture.detectChanges();
    component.projectControls.fromDate.markAsTouched();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.project-fromdate mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('required');
  });

  it('should accept a normal project start date (now)',() => {
    component.projectControls.fromDate.setValue(new Date());
    fixture.detectChanges();
    expect(component.projectControls.fromDate.valid).toBe(true);
  });
  it('should not show an error message when a valid project start date is supplied (now)',() => {
    component.projectControls.fromDate.setValue(new Date());
    fixture.detectChanges();
    component.projectControls.fromDate.markAsTouched();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.project-todate mat-error'));
    expect(de).not.toBeTruthy();
  });
  it('should not accept an empty project end date',() => {
    component.projectControls.toDate.setValue('');
    fixture.detectChanges();
    expect(component.projectControls.toDate.valid).toBe(false);
  });

  it('should show an error message when an empty end date is supplied',() => {
    component.projectControls.toDate.setValue('');
    fixture.detectChanges();
    component.projectControls.toDate.markAsTouched();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.project-todate mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('required');
  });

  it('should accept a normal project end date after the start date ()',() => {
    let now:Date = new Date();
    let month:number = 30 * 24 * 60 * 60 * 1000 ;
    let nextMonth:Date = new Date( month + now.valueOf());
    component.projectControls.fromDate.setValue(now);
    component.projectControls.toDate.setValue(nextMonth);
    fixture.detectChanges();
    expect(component.projectControls.toDate.valid).toBe(true);
  });

  it('should not show an error message when a valid end date is supplied ()',() => {
    let now:Date = new Date();
    let month:number = 30 * 24 * 60 * 60 * 1000 ;
    let nextMonth:Date = new Date( month + now.valueOf());
    component.projectControls.fromDate.setValue(now);
    component.projectControls.toDate.setValue(nextMonth);
    fixture.detectChanges();
    component.projectControls.toDate.markAsTouched();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.project-todate mat-error'));
    expect(de).not.toBeTruthy();
  });



it('should not accept an empty goal',() => {
  component.projectControls.goal.setValue(' ');
  fixture.detectChanges();
  expect(component.projectControls.goal.valid).toBe(false);
});

it('should show an error message when an empty goal is supplied',() => {
  component.projectControls.goal.setValue(' ');
  fixture.detectChanges();
  component.projectControls.goal.markAsTouched();
  fixture.detectChanges();
  de = fixture.debugElement.query(By.css('mat-form-field.project-goal mat-error'));
  el = de.nativeElement;
  expect(el.textContent).toContain('required');
});

it('should not accept letters in goal (123 3)',() => {
  component.projectControls.goal.setValue('123 3');
  fixture.detectChanges();
  expect(component.projectControls.goal.valid).toBe(false);
});

it('should show an error message when an invalid goal is supplied (123 3)',() => {
  component.projectControls.goal.setValue('123 3');
  fixture.detectChanges();
  component.projectControls.goal.markAsTouched();
  fixture.detectChanges();
  de = fixture.debugElement.query(By.css('mat-form-field.project-goal mat-error'));
  el = de.nativeElement;
  expect(el.textContent).toContain('greater than');
});

it('should not accept zero goal (0)',() => {
  component.projectControls.goal.setValue('0');
  fixture.detectChanges();
  expect(component.projectControls.goal.valid).toBe(false);
});

it('should show an error message when a zero goal is supplied (0)',() => {
  component.projectControls.goal.setValue('0');
  fixture.detectChanges();
  component.projectControls.goal.markAsTouched();
  fixture.detectChanges();
  de = fixture.debugElement.query(By.css('mat-form-field.project-goal mat-error'));
  el = de.nativeElement;
  expect(el.textContent).toContain('greater than');
});

it('should not accept a negative goal (-1000)',() => {
  component.projectControls.goal.setValue('-1000');
  fixture.detectChanges();
  expect(component.projectControls.goal.valid).toBe(false);
});

it('should show an error message when a negative goal is supplied (-1000)',() => {
  component.projectControls.goal.setValue('-1000');
  fixture.detectChanges();
  component.projectControls.goal.markAsTouched();
  fixture.detectChanges();
  de = fixture.debugElement.query(By.css('mat-form-field.project-goal mat-error'));
  el = de.nativeElement;
  expect(el.textContent).toContain('greater than');
});


it('should accept a valid (10000)',() => {
  component.projectControls.goal.setValue('10000');
  fixture.detectChanges();
  expect(component.projectControls.goal.valid).toBe(true);
});

it('should not show an error message when a valid goal is supplied (10000)',() => {
  component.projectControls.goal.setValue('10000');
  fixture.detectChanges();
  component.projectControls.goal.markAsTouched();
  fixture.detectChanges();
  de = fixture.debugElement.query(By.css('mat-form-field.project-goal mat-error'));
  expect(de).not.toBeTruthy();
});



});
