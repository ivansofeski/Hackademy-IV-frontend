import { OrganizationFormComponent } from './organization-form/organization-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationPageComponent } from './organization-page/organization-page.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'admin/organizations', component: OrganizationListComponent },
  { path: 'admin/organizations/new', component: OrganizationFormComponent },
  { path: 'admin/organizations/view/:id', component: OrganizationPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }

