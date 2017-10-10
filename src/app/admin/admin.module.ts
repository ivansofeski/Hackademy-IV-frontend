import { OrganizationFormComponent } from './organization-form/organization-form.component';
import { NgModule } from '@angular/core';

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
import { ProjectBlogComponent } from './project-blog/project-blog.component';

@NgModule({
  imports: [
    AdminRoutingModule,
    SharedModule,
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
    ProjectBlogComponent,
  ],
  providers: [DataService]
})

export class AdminModule { }
