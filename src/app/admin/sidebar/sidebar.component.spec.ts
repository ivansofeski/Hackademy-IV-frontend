import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

// Components
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarComponent ],
      imports: [ SharedModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a sidebar container', () => {
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('div.sidebar-container'));
    el = de.nativeElement;
    expect(de).toBeTruthy();
  });

  it('should render menu item(s)', () => {
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('li.item'));
    el = de.nativeElement;
    expect(de).toBeTruthy();
  });

  it('should render proper nested menu items', () => {
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('li.item.hasItems'));
    // el = de.nativeElement;
    expect(de).toBeTruthy();
  });
});
