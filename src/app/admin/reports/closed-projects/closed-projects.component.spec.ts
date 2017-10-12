import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedProjectsComponent } from './closed-projects.component';

describe('ClosedProjectsComponent', () => {
  let component: ClosedProjectsComponent;
  let fixture: ComponentFixture<ClosedProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
