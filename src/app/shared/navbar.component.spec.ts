import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {
  MdButtonModule,
  MdCardModule,
  MdIconModule,
  MdMenuModule,
  MdProgressBarModule,
  MdToolbarModule
} from '@angular/material';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent],
      imports: [MdCardModule, MdIconModule, MdToolbarModule, MdMenuModule, MdButtonModule, MdProgressBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
