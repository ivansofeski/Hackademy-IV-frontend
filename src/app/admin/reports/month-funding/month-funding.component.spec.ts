import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthFundingComponent } from './month-funding.component';

describe('MonthFundingComponent', () => {
  let component: MonthFundingComponent;
  let fixture: ComponentFixture<MonthFundingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthFundingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
