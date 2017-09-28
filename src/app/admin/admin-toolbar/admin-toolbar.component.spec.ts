import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By }              from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminToolbarComponent } from './admin-toolbar.component';
import { SharedModule } from '../../shared/shared.module';

describe('AdminToolbarComponent', () => {
  let component: AdminToolbarComponent;
  let fixture: ComponentFixture<AdminToolbarComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

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
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render a material toolbar', () => {
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('md-toolbar.mat-toolbar'));
    //el = de.nativeElement;
    expect(de).toBeTruthy();
  });

  it('should render material raised buttons', () => {
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('button.mat-raised-button'));
    //el = de.nativeElement;
    expect(de).toBeTruthy();
  });

  it('should render buttons with material primary color', () => {
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('button.mat-primary'));
    //el = de.nativeElement;
    expect(de).toBeTruthy();
  });

});
