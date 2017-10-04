import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorOverviewComponent } from './donor-overview.component';

describe('DonorOverviewComponent', () => {
  let component: DonorOverviewComponent;
  let fixture: ComponentFixture<DonorOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
