import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationFormComponent } from './organization-form.component';
import { DataService } from '../../shared/services/data.service';
import { SharedModule } from '../../shared/shared.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('OrganizationFormComponent', () => {
  let component: OrganizationFormComponent;
  let fixture: ComponentFixture<OrganizationFormComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

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
    component.formControls.name.markAsTouched();
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
    component.formControls.name.markAsTouched();
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
    component.formControls.orgNumber.markAsTouched();
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
    component.formControls.orgNumber.markAsTouched();
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

  it('Should not show an error when a welformed organization number is supplied (123456-as12)', () => {
    component.formControls.orgNumber.setValue('123456-as12');
    fixture.detectChanges();
    component.formControls.orgNumber.markAsTouched();
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
    component.formControls.contactName.markAsTouched();
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
    component.formControls.contactName.markAsTouched();
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
    component.formControls.contactEmail.markAsTouched();
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
    component.formControls.contactEmail.markAsTouched();
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
    component.formControls.contactEmail.markAsTouched();
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
    component.formControls.address.markAsTouched();
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
    component.formControls.address.markAsTouched();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-address mat-error'));
    expect(de).not.toBeTruthy();
  });

  it('Should  not accept an empty account', () => {
    component.formControls.bankAccount.setValue(' ');
    fixture.detectChanges();
    expect(component.formControls.bankAccount.valid).toBe(false);
  });

  it('Should not show an error when an empty bank account is supplied', () => {
    component.formControls.bankAccount.setValue(' ');
    fixture.detectChanges();
    component.formControls.bankAccount.markAsTouched();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-bankAccount mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('required');
  });

  it('Should  not accept a malformed bank account (1234-1234)', () => {
    component.formControls.bankAccount.setValue('1234-1234');
    fixture.detectChanges();
    expect(component.formControls.bankAccount.valid).toBe(false);
  });

  it('Should not show an error when a malformed bank account is supplied 1234-1234', () => {
    component.formControls.bankAccount.setValue('1234-1234');
    fixture.detectChanges();
    component.formControls.bankAccount.markAsTouched();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-bankAccount mat-error'));
    el = de.nativeElement;
    expect(el.textContent).toContain('XXXX-XXXX-XXXX-XXXX');
  });



  it('Should  accept a well formed account (1234-1234-1234-1234)', () => {
    component.formControls.bankAccount.setValue('1234-1234-1234-1234');
    fixture.detectChanges();
    expect(component.formControls.bankAccount.valid).toBe(true);
  });

  it('Should not show an error when a well formed account (1234-1234-1234-1234) is supplied', () => {
    component.formControls.bankAccount.setValue('1234-1234-1234-1234');
    fixture.detectChanges();
    component.formControls.bankAccount.markAsTouched();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-bankAccount mat-error'));
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
    component.formControls.description.markAsTouched();
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
    component.formControls.description.markAsTouched();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('mat-form-field.organization-description mat-error'));
    expect(de).not.toBeTruthy();
  });

});
