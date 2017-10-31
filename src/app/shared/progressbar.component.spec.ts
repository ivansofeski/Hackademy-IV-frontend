import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressbarComponent } from './progressbar.component';
import { MatProgressBarModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ProgressbarComponent', () => {
  let component: ProgressbarComponent;
  let fixture: ComponentFixture<ProgressbarComponent>;
  let de:      DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressbarComponent ],
      imports: [MatProgressBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should display a material progress bar', () => {
    component.neededFunding = 100;
    component.raisedFunding = 50;
    de = fixture.debugElement.query(By.css('mat-progress-bar'));
    expect(de).toBeTruthy();
  });
});
