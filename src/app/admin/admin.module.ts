import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganizationFormComponent } from './organization-form/organization-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MdInputModule, MdListModule, MdDatepickerModule, MdNativeDateModule, MdRadioModule, MdSelectModule } from '@angular/material';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { AdminToolbarComponent } from './admin-toolbar/admin-toolbar.component';
import { OrganizationPageComponent } from './organization-page/organization-page.component';

// Services
import { DataService } from './services/data.service';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    AdminRoutingModule,
    SharedModule,
    MdInputModule,
    MdListModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    MdNativeDateModule,
    MdDatepickerModule,
    MdRadioModule,
    MdSelectModule
  ],
  exports: [
    MdInputModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    MdNativeDateModule,
    MdDatepickerModule,
    MdRadioModule,
    MdSelectModule
  ],
  declarations: [
    AdminComponent,
    OrganizationListComponent,
    ProjectListComponent,
    AdminToolbarComponent,
    OrganizationFormComponent,
    OrganizationPageComponent,
    ProjectPageComponent,
    ProjectFormComponent,
    SidebarComponent,
  ],
  providers: [DataService]
})

export class AdminModule { }
