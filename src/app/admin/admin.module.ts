import { OrganizationFormComponent } from './organization-form/organization-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { AdminToolbarComponent } from './admin-toolbar/admin-toolbar.component';

// Services
import { DataService } from './services/data.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [AdminComponent, OrganizationListComponent, AdminToolbarComponent],
  providers: [DataService]
})

export class AdminModule { }
