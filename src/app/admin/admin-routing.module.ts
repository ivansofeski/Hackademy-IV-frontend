import { OrganizationFormComponent } from './organization-form/organization-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationPageComponent } from './organization-page/organization-page.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, children: [
    { path: 'organizations', component: OrganizationListComponent },
    { path: 'organizations/new', component: OrganizationFormComponent },
    { path: 'organizations/view/:id', component: OrganizationPageComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }