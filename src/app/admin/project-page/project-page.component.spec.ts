import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPageComponent } from './project-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { DataService } from '../services/data.service';
import { AgmCoreModule } from '@agm/core';

describe('ProjectPageComponent', () => {
  let component: ProjectPageComponent;
  let fixture: ComponentFixture<ProjectPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPageComponent ],
      imports: [ SharedModule, RouterTestingModule, AgmCoreModule ],
      providers: [ DataService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
