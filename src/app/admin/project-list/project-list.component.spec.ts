import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectListComponent } from './project-list.component';
import { SharedModule } from '../../shared/shared.module';

import { testData } from '../test-data';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Rx';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DataService } from '../../shared/services/data.service';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let debug: DebugElement;
  let debugEl: DebugElement[];
  let HTMLelement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectListComponent],
      imports: [SharedModule, RouterTestingModule],
      providers: [DataService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    const dataService = fixture.debugElement.injector.get(DataService);
    const spy = spyOn(dataService, 'getProjects').and.returnValue(Observable.of(testData.projectList));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should display all projects in rows', () => {
    debugEl = fixture.debugElement.queryAll(By.css('mat-table mat-row'));
    expect(debugEl.length).toBe(testData.projectList.length);
  });

  it('should display projects logo', () => {
    const index = Math.floor(testData.projectList.length * Math.random());
    debug = fixture.debugElement.query(By.css('mat-table'));
    HTMLelement = debug.nativeElement;
    expect(HTMLelement.innerHTML).toContain(testData.projectList[index].mainImage);
  });

  it('should display projects name', () => {
    const index = Math.floor(testData.projectList.length * Math.random());
    debug = fixture.debugElement.query(By.css('mat-table'));
    HTMLelement = debug.nativeElement;
    expect(HTMLelement.textContent).toContain(testData.projectList[index].projectName);
  });

  it('should display projects start date', () => {
    const index = Math.floor(testData.projectList.length * Math.random());
    debug = fixture.debugElement.query(By.css('mat-table'));
    HTMLelement = debug.nativeElement;
    expect(HTMLelement.textContent).toContain(testData.projectList[index].fromDate);
  });

  it('should display projects due date', () => {
    const index = Math.floor(testData.projectList.length * Math.random());
    debug = fixture.debugElement.query(By.css('mat-table'));
    HTMLelement = debug.nativeElement;
    expect(HTMLelement.textContent).toContain(testData.projectList[index].toDate);
  });

  it('should display projects funding goal', () => {
    const index = Math.floor(testData.projectList.length * Math.random());
    debug = fixture.debugElement.query(By.css('mat-table'));
    HTMLelement = debug.nativeElement;
    expect(HTMLelement.textContent).toContain(testData.projectList[index].neededFunding.toString());
  });

  it('should display projects funding collected', () => {
    const index = Math.floor(testData.projectList.length * Math.random());
    debug = fixture.debugElement.query(By.css('mat-table'));
    HTMLelement = debug.nativeElement;
    expect(HTMLelement.textContent).toContain(testData.projectList[index].raisedFunding.toString());
  });
});

