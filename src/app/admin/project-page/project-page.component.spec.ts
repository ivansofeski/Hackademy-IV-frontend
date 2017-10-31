import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPageComponent } from './project-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { DataService } from '../../shared/services/data.service';
import { AgmCoreModule } from '@agm/core';
import { DebugElement } from '@angular/core';
import { testData } from '../test-data';
import { Observable } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('ProjectPageComponent', () => {
  let component: ProjectPageComponent;
  let fixture: ComponentFixture<ProjectPageComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  let index = 0;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPageComponent ],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [
        DataService,
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 1 } }, paramMap: Observable.of({get: () => 1}) } }
       ],
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPageComponent);
    component = fixture.componentInstance;
    const dataService = fixture.debugElement.injector.get(DataService);
    const spy1 = spyOn(dataService, 'getOrganizations').and.returnValue(Observable.of(testData.orgList));
    const spy2 = spyOn(dataService, 'getProjects').and.returnValue(Observable.of(testData.projectList));
    index = Math.floor(testData.projectList.length * Math.random());
    component._project = testData.projectList[index];
    component._project.organization = testData.orgList.filter((v, k) => v.id === testData.projectList[index].organizationId)[0];

    // Having an issue with loading the map on the test bed.
    // fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
