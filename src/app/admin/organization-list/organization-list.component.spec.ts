import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { OrganizationListComponent } from './organization-list.component';
import { DebugElement } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DataService } from '../services/data.service';
import { testData } from '../test-data';
import { By } from '@angular/platform-browser';

describe('OrganizationListComponent', () => {
  let component: OrganizationListComponent;
  let fixture: ComponentFixture<OrganizationListComponent>;
  let de:      DebugElement;
  let des:     DebugElement[];
  let el:      HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationListComponent ],
      imports: [ SharedModule ],
      providers: [ DataService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationListComponent);
    component = fixture.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService,'getOrganizations').and.returnValue(Observable.of(testData.orgList));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display all organizations in rows', () => {
    des = fixture.debugElement.queryAll(By.css('table tbody tr'));
    expect(des.length).toBe(testData.orgList.length);
  });

  it('should display organization names',() => {
    let index:number = Math.floor(testData.orgList.length * Math.random());  
    de = fixture.debugElement.query(By.css('tbody'));
    el = de.nativeElement;
    expect(el.textContent).toContain(testData.orgList[index].name);
  });

  it('should display organization Ids',() => {
    let index:number = Math.floor(testData.orgList.length * Math.random());  
    de = fixture.debugElement.query(By.css('tbody'));
    el = de.nativeElement;
    expect(el.textContent).toContain(testData.orgList[index].orgId);
  });
  
  it('should display organization addresses',() => {
    let index:number = Math.floor(testData.orgList.length * Math.random());  
    de = fixture.debugElement.query(By.css('tbody'));
    el = de.nativeElement;
    expect(el.textContent).toContain(testData.orgList[index].address);
  });

  it('should display organization billing contact persons',() => {
    let index:number = Math.floor(testData.orgList.length * Math.random());  
    de = fixture.debugElement.query(By.css('tbody'));
    el = de.nativeElement;
    expect(el.textContent).toContain(testData.orgList[index].contact.person);
  });

  it('should display organization billing contact emails',() => {
    let index:number = Math.floor(testData.orgList.length * Math.random());  
    de = fixture.debugElement.query(By.css('tbody'));
    el = de.nativeElement;
    expect(el.textContent).toContain(testData.orgList[index].contact.email);
  });

  it('should display organization billing contact phones',() => {
    let index:number = Math.floor(testData.orgList.length * Math.random());  
    de = fixture.debugElement.query(By.css('tbody'));
    el = de.nativeElement;
    expect(el.textContent).toContain(testData.orgList[index].contact.phone);
  });

  it('should NOT display organization billing addresses',() => {
    let index:number = Math.floor(testData.orgList.length * Math.random());  
    de = fixture.debugElement.query(By.css('tbody'));
    el = de.nativeElement;
    expect(el.textContent).not.toContain(testData.orgList[index].billing);
  });

  it('should NOT display organization descriptions',() => {
    let index:number = Math.floor(testData.orgList.length * Math.random());  
    de = fixture.debugElement.query(By.css('tbody'));
    el = de.nativeElement;
    expect(el.textContent).not.toContain(testData.orgList[index].description);
  });
});
