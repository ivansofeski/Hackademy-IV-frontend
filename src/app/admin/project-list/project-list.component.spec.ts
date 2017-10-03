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
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectListComponent ],
      imports: [ SharedModule, RouterTestingModule ],
      providers: [ DataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService,'getProjects').and.returnValue(Observable.of(testData.projectList));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});


