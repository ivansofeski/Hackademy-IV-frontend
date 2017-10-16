import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationFormComponent } from './organization-form.component';
import { DataService } from '../services/data.service';
import { SharedModule } from '../../shared/shared.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('OrganizationFormComponent', () => {
  let component: OrganizationFormComponent;
  let fixture: ComponentFixture<OrganizationFormComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  let button:  HTMLElement;
  // let des:     DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationFormComponent ],
      imports: [ SharedModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationFormComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should not accept an empty organization name', () => {
    component.formControls.name.setValue(' ');
    fixture.detectChanges();
    expect(component.formControls.name.valid).toBe(false);
  });

  it('Should show an error when an empty organization name is supplied', () => {
    component.formControls.name.setValue(' ');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-warn')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-name mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('required');
  });

  it('Should accept an "BBB" as an organization name', () => {
    component.formControls.name.setValue('BBB');
    fixture.detectChanges();
    expect(component.formControls.name.valid).toBe(true);
  });

  it('Should not show an error when a valid organization name is supplied (BBB)', () => {
    component.formControls.name.setValue('BBB');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-warn')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-name mat-error'));
    expect(de).not.toBeTruthy();
  });


  it('Should accept an "B B B" as an organization name', () => {
    component.formControls.name.setValue('B B B');
    fixture.detectChanges();
    expect(component.formControls.name.valid).toBe(true);
  });

  it('Should not accept an empty organization number', () => {
    component.formControls.orgNumber.setValue(' ');
    fixture.detectChanges();
    expect(component.formControls.orgNumber.valid).toBe(false);
  });

  it('Should show an error when an empty organization number is supplied', () => {
    component.formControls.orgNumber.setValue(' ');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-warn')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-number mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('required');
  });

  it('Should not accept a malformed organization number (1234567)', () => {
    component.formControls.orgNumber.setValue('1234567');
    fixture.detectChanges();
    expect(component.formControls.orgNumber.valid).toBe(false);
  });

  it('Should show an error when a malformed organization number is supplied (1234567)', () => {
    component.formControls.orgNumber.setValue('1234567');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-warn')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-number mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('XXXXXX-XXXX');
  });

  it('Should accept a wellformed organization number (123456-as12)', () => {
    component.formControls.orgNumber.setValue('123456-as12');
    fixture.detectChanges();
    expect(component.formControls.orgNumber.valid).toBe(true);
  });

  it('Should not show an error when a welformedl organization number is supplied (123456-as12)', () => {
    component.formControls.orgNumber.setValue('123456-as12');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-warn')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-number mat-error'));
    expect(de).not.toBeTruthy();
  });

  it('Should accept another wellformed organization number (1Az456-as12)', () => {
    component.formControls.orgNumber.setValue('1Az456-as12');
    fixture.detectChanges();
    expect(component.formControls.orgNumber.valid).toBe(true);
  });

  it('Should not accept an empty contact name', () => {
    component.formControls.contactName.setValue(' ');
    fixture.detectChanges();
    expect(component.formControls.contactName.valid).toBe(false);
  });

  it('Should show an error when an empty contact name is supplied', () => {
    component.formControls.contactName.setValue(' ');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-warn')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-contact-name mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('required');
  });

  it('Should accept a normal contact name (John doe)', () => {
    component.formControls.contactName.setValue('John doe');
    fixture.detectChanges();
    expect(component.formControls.contactName.valid).toBe(true);
  });

  it('Should not show an error when a contact name is supplied (John doe)', () => {
    component.formControls.contactName.setValue('John doe');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-warn')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-contact-name mat-error'));
    expect(de).not.toBeTruthy();
  });

  it('Should not accept an empty contact email', () => {
    component.formControls.contactEmail.setValue(' ');
    fixture.detectChanges();
    expect(component.formControls.contactEmail.valid).toBe(false);
  });

  it('Should show an error when an empty contact email is supplied', () => {
    component.formControls.contactEmail.setValue(' ');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-warn')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-contact-email mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('required');
  });

  it('Should not accept a malformed contact email (John doe @ john.doe)', () => {
    component.formControls.contactEmail.setValue('John doe @ john.doe');
    fixture.detectChanges();
    expect(component.formControls.contactEmail.valid).toBe(false);
  });

  it('Should show an error when a malformed contact email is supplied', () => {
    component.formControls.contactEmail.setValue('John doe @ john.doe');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-warn')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-contact-email mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('valid');
  });

  it('Should accept a normal contact email (John.doe@john.doe)', () => {
    component.formControls.contactEmail.setValue('John.doe@john.doe');
    fixture.detectChanges();
    expect(component.formControls.contactEmail.valid).toBe(true);
  });

  it('Should not show an error when a contact email is supplied (John.doe@john.doe)', () => {
    component.formControls.contactEmail.setValue('John.doe@john.doe');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-warn')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-contact-email mat-error'));
    expect(de).not.toBeTruthy();
  });

  it('Should not accept an empty contact address', () => {
    component.formControls.address.setValue(' ');
    fixture.detectChanges();
    expect(component.formControls.address.valid).toBe(false);
  });

  it('Should show an error when an empty contact address is supplied', () => {
    component.formControls.address.setValue(' ');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-warn')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-address mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('required');
  });

  it('Should  accept a normal contact address (Somewhere 12 Malmö)', () => {
    component.formControls.address.setValue('Somewhere 12 Malmö');
    fixture.detectChanges();
    expect(component.formControls.address.valid).toBe(true);
  });

  it('Should not show an error when a contact address  is supplied (Somewhere 12 Malmö)', () => {
    component.formControls.address.setValue('Somewhere 12 Malmö');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-warn')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-address mat-error'));
    expect(de).not.toBeTruthy();
  });

  it('Should not accept an empty postal code', () => {
    component.formControls.zipCode.setValue(' ');
    fixture.detectChanges();
    expect(component.formControls.zipCode.valid).toBe(false);
  });

  it('Should show an error when an empty postal code is supplied', () => {
    component.formControls.zipCode.setValue(' ');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-warn')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-postalCode mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('required');
  });

  it('Should not accept a long postal code (123456)', () => {
    component.formControls.zipCode.setValue('123456');
    fixture.detectChanges();
    expect(component.formControls.zipCode.valid).toBe(false);
  });

  it('Should show an error when an long postal code is supplied  (123456)', () => {
    component.formControls.zipCode.setValue('123456');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-warn')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-postalCode mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('digits');
  });

  it('Should not accept a short postal code (1234)', () => {
    component.formControls.zipCode.setValue('1234');
    fixture.detectChanges();
    expect(component.formControls.zipCode.valid).toBe(false);
  });

  it('Should show an error when an short postal code is supplied  (1234)', () => {
    component.formControls.zipCode.setValue('1234');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-warn')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-postalCode mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('digits');
  });

  it('Should not accept letters in the postal code (1234A)', () => {
    component.formControls.zipCode.setValue('1234A');
    fixture.detectChanges();
    expect(component.formControls.zipCode.valid).toBe(false);
  });

  it('Should show an error when a malformed postal code is supplied  (1234A)', () => {
    component.formControls.zipCode.setValue('1234A');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-warn')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-postalCode mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('digits');
  });

  it('Should accept a normal postal code (12345)', () => {
    component.formControls.zipCode.setValue('12345');
    fixture.detectChanges();
    expect(component.formControls.zipCode.valid).toBe(true);
  });

  it('Should not show an error when a valid postal code is supplied (12345)', () => {
    component.formControls.zipCode.setValue('12345');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-warn')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-postalCode mat-error'));
    expect(de).not.toBeTruthy();
  });

  it('Should not accept an empty city', () => {
    component.formControls.city.setValue(' ');
    fixture.detectChanges();
    expect(component.formControls.city.valid).toBe(false);
  });

  it('Should show an error when an empty city is supplied', () => {
    component.formControls.city.setValue(' ');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-warn')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-city mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('required');
  });

  it('Should accept a normal city', () => {
    component.formControls.city.setValue('Malmö City');
    fixture.detectChanges();
    expect(component.formControls.city.valid).toBe(true);
  });

  it('Should not show an error when a valid city is supplied (Malmö City)', () => {
    component.formControls.city.setValue('Malmö City');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-warn')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-city mat-error'));
    expect(de).not.toBeTruthy();
  });

  it('Should not accept an empty description', () => {
    component.formControls.description.setValue(' ');
    fixture.detectChanges();
    expect(component.formControls.description.valid).toBe(false);
  });

  it('Should show an error when an empty description is supplied', () => {
    component.formControls.description.setValue(' ');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-warn')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-description mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('required');
  });

  it('Should accept a normal description', () => {
    component.formControls.description.setValue('This is a description');
    fixture.detectChanges();
    expect(component.formControls.description.valid).toBe(true);
  });

  it('Should not show an error when a valid description is supplied ', () => {
    component.formControls.description.setValue('This is a description');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button.mat-warn')).nativeElement;
    button.click();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-description mat-error'));
    expect(de).not.toBeTruthy();
  });

});
