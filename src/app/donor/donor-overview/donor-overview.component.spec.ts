import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorOverviewComponent } from './donor-overview.component';
import {DonorComponent} from '../donor.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('DonorOverviewComponent', () => {
  let component: DonorOverviewComponent;
  let fixture: ComponentFixture<DonorOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorOverviewComponent, DonorComponent ],
      imports: [SharedModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
