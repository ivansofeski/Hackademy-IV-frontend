import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminComponent } from './admin.component';
import { AdminToolbarComponent } from './admin-toolbar/admin-toolbar.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent , SidebarComponent],
      imports: [ SharedModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  /* it('should render the admin toolbar', () => {
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('app-admin-toolbar'));
    //el = de.nativeElement;
    expect(de).toBeTruthy();
  }); */

  it('should render the Admin Sidebar', () => {
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('app-sidebar'));
    expect(de).toBeTruthy();
  });

});
