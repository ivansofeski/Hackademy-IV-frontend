import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorComponent } from './donor.component';
import {SharedModule} from '../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('DonorComponent', () => {
  let component: DonorComponent;
  let fixture: ComponentFixture<DonorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorComponent ],
      imports:[SharedModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
