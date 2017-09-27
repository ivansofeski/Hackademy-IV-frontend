import { OrganizationFormComponent } from './organization-form/organization-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent , children: [
//    {path:'admin', AdminPanelComponent},
//    {path:'organizations', OrganizatonsListComponent}
    {path: 'admin/gitorganizations/new', component: OrganizationFormComponent}
//    {path:'organizations/view/:id', OrganizatonViewComponent}

]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
