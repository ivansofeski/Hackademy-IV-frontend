import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressbarComponent } from './progressbar.component';
import { MdProgressBarModule } from '@angular/material';

describe('ProgressbarComponent', () => {
  let component: ProgressbarComponent;
  let fixture: ComponentFixture<ProgressbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressbarComponent ],
      imports:[MdProgressBarModule]
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
});
