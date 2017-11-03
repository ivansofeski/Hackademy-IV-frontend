import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationPageComponent } from './organization-page.component';
import { SharedModule } from '../../shared/shared.module';
import { DataService } from '../../shared/services/data.service';
import { testData } from '../test-data';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Rx';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('OrganizationPageComponent', () => {
  let component: OrganizationPageComponent;
  let fixture: ComponentFixture<OrganizationPageComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  let index:   number;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationPageComponent ],
      imports: [ SharedModule, RouterTestingModule ],
      providers: [ DataService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationPageComponent);
    component = fixture.componentInstance;
    const dataService = fixture.debugElement.injector.get(DataService);
    index = Math.floor(testData.orgList.length * Math.random());
    const spy = spyOn(dataService, 'getOrganizationById').and.returnValue(Observable.of(testData.orgList[index]));
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Display the title of the #' + index + ' organization in the list inside of an h2 tag', () => {
    component.organizationId = testData.orgList[index].organizationId;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('h2.org-title'));
    el = de.nativeElement;
    expect(el.textContent).toBe(testData.orgList[index].name);
  });

  it('Display the number of the organization', () => {
    component.organizationId = testData.orgList[index].organizationId;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('div.org-id'));
    el = de.nativeElement;
    expect(el.textContent).toBe(testData.orgList[index].organizationNumber);
  });

  it('Display the address of the organization', () => {
    component.organizationId = testData.orgList[index].organizationId;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('div.org-address'));
    el = de.nativeElement;
    expect(el.textContent).toBe(testData.orgList[index].address);
  });

  it('Display the billing address of the organization', () => {
    component.organizationId = testData.orgList[index].organizationId;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('div.org-billing'));
    el = de.nativeElement;
    expect(el.textContent).toBe(testData.orgList[index].billingInformation);
  });

  it('Display the contact person of the organization', () => {
    component.organizationId = testData.orgList[index].organizationId;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('div.org-person'));
    el = de.nativeElement;
    expect(el.textContent).toBe(testData.orgList[index].contactPersonName);
  });

  it('Display the contact email of the organization', () => {
    component.organizationId = testData.orgList[index].organizationId;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('div.org-email'));
    el = de.nativeElement;
    expect(el.textContent).toBe(testData.orgList[index].contactPersonEmail);
  });


  it('Display the description of the organization', () => {
    component.organizationId = testData.orgList[index].organizationId;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('div.org-desc'));
    el = de.nativeElement;
    expect(el.textContent).toBe(testData.orgList[index].description);
  });


});
