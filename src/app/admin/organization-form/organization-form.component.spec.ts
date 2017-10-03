import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationFormComponent } from './organization-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { SharedModule } from '../../shared/shared.module';

describe('OrganizationFormComponent', () => {
  let component: OrganizationFormComponent;
  let fixture: ComponentFixture<OrganizationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationFormComponent ],
      imports: [ SharedModule, FormsModule, ReactiveFormsModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  //Isolated Tests

  it('Should not accept an empty organization name', () => {
    component.formControls.name.setValue("");
    expect(component.formControls.name.valid).toBe(false);
  });

  it('Should accept an "BBB" as an organization name', () => {
    component.formControls.name.setValue("BBB");
    expect(component.formControls.name.valid).toBe(true);
  });

  it('Should accept an "B B B" as an organization name', () => {
    component.formControls.name.setValue("B B B");
    expect(component.formControls.name.valid).toBe(true);
  });
  
  it('Should not accept an empty organization number', () => {
    component.formControls.orgNumber.setValue("");
    expect(component.formControls.orgNumber.valid).toBe(false);
  });

  it('Should not accept a long organization number (1234567)', () => {
    component.formControls.orgNumber.setValue("1234567");
    expect(component.formControls.orgNumber.valid).toBe(false);
  });

  it('Should accept a normal organization number (123456)', () => {
    component.formControls.orgNumber.setValue("123456");
    expect(component.formControls.orgNumber.valid).toBe(true);
  });

  it('Should not accept an empty contact name', () => {
    component.formControls.contact.setValue("");
    expect(component.formControls.contact.valid).toBe(false);
  });

  it('Should accept a normal contact name (John doe)', () => {
    component.formControls.contact.setValue("John doe");
    expect(component.formControls.contact.valid).toBe(true);
  });

  it('Should not accept an empty contact email', () => {
    component.formControls.contactEmail.setValue("");
    expect(component.formControls.contactEmail.valid).toBe(false);
  });

  it('Should not accept a malformed contact email (John doe @ john.doe', () => {
    component.formControls.contactEmail.setValue("John doe @ john.doe");
    expect(component.formControls.contactEmail.valid).toBe(false);
  });

  it('Should accept a normal contact email (John.doe@john.doe)', () => {
    component.formControls.contactEmail.setValue("John.doe@john.doe");
    expect(component.formControls.contactEmail.valid).toBe(true);
  });

  it('Should not accept an empty contact address', () => {
    component.formControls.adress.setValue("");
    expect(component.formControls.adress.valid).toBe(false);
  });

  it('Should  accept a normal contact address (Somewhere 12 Malmö)', () => {
    component.formControls.adress.setValue("Somewhere 12 Malmö");
    expect(component.formControls.adress.valid).toBe(true);
  });

  it('Should not accept an empty postal code', () => {
    component.formControls.zipCode.setValue("");
    expect(component.formControls.zipCode.valid).toBe(false);
  });

  it('Should not accept a long postal code (123456)', () => {
    component.formControls.zipCode.setValue("123456");
    expect(component.formControls.zipCode.valid).toBe(false);
  });

  it('Should not accept a short postal code (1234)', () => {
    component.formControls.zipCode.setValue("1234");
    expect(component.formControls.zipCode.valid).toBe(false);
  });

  it('Should not accept letters in the postal code (12345A)', () => {
    component.formControls.zipCode.setValue("1234A");
    expect(component.formControls.zipCode.valid).toBe(true);
  });

  it('Should accept a normal postal code (12345)', () => {
    component.formControls.zipCode.setValue("12345");
    expect(component.formControls.zipCode.valid).toBe(true);
  });
  
  it('Should not accept an empty city', () => {
    component.formControls.city.setValue("");
    expect(component.formControls.city.valid).toBe(false);
  });

  it('Should accept a normal city', () => {
    component.formControls.city.setValue("Malmö City");
    expect(component.formControls.city.valid).toBe(true);
  });

  it('Should not accept an empty description', () => {
    component.formControls.description.setValue("");
    expect(component.formControls.description.valid).toBe(false);
  });

  it('Should accept a normal description', () => {
    component.formControls.description.setValue("This is a description");
    expect(component.formControls.description.valid).toBe(true);
  });

});
