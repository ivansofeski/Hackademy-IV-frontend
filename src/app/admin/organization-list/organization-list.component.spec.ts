import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { OrganizationListComponent } from './organization-list.component';
import { DebugElement } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DataService } from '../../shared/services/data.service';
import { testData } from '../test-data';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('OrganizationListComponent', () => {
  let component: OrganizationListComponent;
  let fixture: ComponentFixture<OrganizationListComponent>;
  let de:      DebugElement;
  let des:     DebugElement[];
  let el:      HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationListComponent ],
      imports: [ SharedModule, RouterTestingModule ],
      providers: [ DataService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationListComponent);
    component = fixture.componentInstance;
    const dataService = fixture.debugElement.injector.get(DataService);
    const spy = spyOn(dataService, 'getOrganizations').and.returnValue(Observable.of(testData.orgList));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display all organizations in rows', () => {
    des = fixture.debugElement.queryAll(By.css('mat-table mat-row'));
    expect(des.length).toBe(testData.orgList.length);
  });

  it('should display organization name', () => {
    const index = Math.floor(testData.orgList.length * Math.random());
    de = fixture.debugElement.query(By.css('mat-table'));
    el = de.nativeElement;
    expect(el.textContent).toContain(testData.orgList[index].name);
  });

  it('should display organization addresses', () => {
    const index = Math.floor(testData.orgList.length * Math.random());
    de = fixture.debugElement.query(By.css('mat-table'));
    el = de.nativeElement;
    expect(el.textContent).toContain(testData.orgList[index].address);
  });

  it('should display organization contact persons', () => {
    const index = Math.floor(testData.orgList.length * Math.random());
    de = fixture.debugElement.query(By.css('mat-table'));
    el = de.nativeElement;
    expect(el.textContent).toContain(testData.orgList[index].contactPersonName);
  });

});
