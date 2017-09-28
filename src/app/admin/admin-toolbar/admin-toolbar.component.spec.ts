import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminToolbarComponent } from './admin-toolbar.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminToolbarComponent', () => {
  let component: AdminToolbarComponent;
  let fixture: ComponentFixture<AdminToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminToolbarComponent ],
      imports:[ SharedModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
