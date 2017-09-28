import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganizationFormComponent } from './organization-form/organization-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { AdminToolbarComponent } from './admin-toolbar/admin-toolbar.component';
import { OrganizationPageComponent } from './organization-page/organization-page.component';

// Services
import { DataService } from './services/data.service';
import { MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    AdminRoutingModule,
    SharedModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  exports: [
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [AdminComponent, OrganizationListComponent, AdminToolbarComponent, OrganizationFormComponent, OrganizationPageComponent],
  providers: [DataService]
})

export class AdminModule { }
