// Modules
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';

// Components
import { DashboardComponent } from './dashboard.component';

// Pipes
import { KeysPipe } from './keys.pipe';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, KeysPipe ],
      imports: [ SharedModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
