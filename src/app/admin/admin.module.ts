import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ReportsModule } from './reports/reports.module';

// Components
import { AdminComponent } from './admin.component';
import { AdminToolbarComponent } from './admin-toolbar/admin-toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrganizationPageComponent } from './organization-page/organization-page.component';
import { OrganizationFormComponent } from './organization-form/organization-form.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ActivityFormComponent } from './activity-form/activity-form.component';

// Pipes
import { KeysPipe } from './dashboard/keys.pipe';

@NgModule({
  imports: [
    AdminRoutingModule,
    SharedModule,
    ReportsModule
  ],
  exports: [
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
    DashboardComponent,
    ActivityFormComponent,
    KeysPipe,
  ],
  providers: []
})

export class AdminModule { }
