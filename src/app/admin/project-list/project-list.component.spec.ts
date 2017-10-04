import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectListComponent } from './project-list.component';
import { SharedModule } from '../../shared/shared.module';
import { DataService } from '../services/data.service';
import { testData } from '../test-data';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Rx';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

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
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getProjects').and.returnValue(Observable.of(testData.projectList));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should display all projects in rows', () => {
    debugEl = fixture.debugElement.queryAll(By.css('table tbody tr'));
    expect(debugEl.length).toBe(testData.projectList.length);
  });

  it('should display project names', () => {
    let index: number = Math.floor(testData.projectList.length * Math.random());
    debug = fixture.debugElement.query(By.css('tbody'));
    HTMLelement = debug.nativeElement;
    expect(HTMLelement.textContent).toContain(testData.projectList[index].projectName);
  });

  it('should NOT display project id', () => {
    let index: number = Math.floor(testData.projectList.length * Math.random());
    debug = fixture.debugElement.query(By.css('tbody'));
    HTMLelement = debug.nativeElement;
    expect(HTMLelement.textContent).toContain(testData.projectList[index].projectId);
  });


  it('should display project manager', () => {
    let index: number = Math.floor(testData.projectList.length * Math.random());
    debug = fixture.debugElement.query(By.css('tbody'));
    HTMLelement = debug.nativeElement;
    expect(HTMLelement.textContent).toContain(testData.projectList[index].projectManager);
  });

  it('should display project address', () => {
    let index: number = Math.floor(testData.projectList.length * Math.random());
    debug = fixture.debugElement.query(By.css('tbody'));
    HTMLelement = debug.nativeElement;
    expect(HTMLelement.textContent).toContain(testData.projectList[index].address);
  });

  it('should display project fromdate', () => {
    let index: number = Math.floor(testData.projectList.length * Math.random());
    debug = fixture.debugElement.query(By.css('tbody'));
    HTMLelement = debug.nativeElement;
    expect(HTMLelement.textContent).toContain(testData.projectList[index].fromDate);
  });

  it('should display project todate', () => {
    let index: number = Math.floor(testData.projectList.length * Math.random());
    debug = fixture.debugElement.query(By.css('tbody'));
    HTMLelement = debug.nativeElement;
    expect(HTMLelement.textContent).toContain(testData.projectList[index].toDate);
  });


  it('should display project image', () => {
    let index: number = Math.floor(testData.projectList.length * Math.random());
    debug = fixture.debugElement.query(By.css('img[src="' + testData.projectList[index].mainImage + '"]'));
    HTMLelement = debug.nativeElement;
    expect(HTMLelement).toBeTruthy();
  });

  it('should NOT display project description', () => {
    let index: number = Math.floor(testData.projectList.length * Math.random());
    debug = fixture.debugElement.query(By.css('tbody'));
    HTMLelement = debug.nativeElement;
    expect(HTMLelement.textContent).not.toContain(testData.projectList[index].description);
  });

  it('should display project neededFunding', () => {
    let index: number = Math.floor(testData.projectList.length * Math.random());
    debug = fixture.debugElement.query(By.css('tbody'));
    HTMLelement = debug.nativeElement;
    expect(HTMLelement.textContent).toContain(testData.projectList[index].neededFunding.toString());
  });
  it('should display Fundings raisedFunding', () => {
    let index: number = Math.floor(testData.projectList.length * Math.random());
    debug = fixture.debugElement.query(By.css('tbody'));
    HTMLelement = debug.nativeElement;
    expect(HTMLelement.textContent).toContain(testData.projectList[index].raisedFunding.toString());
  });
});

