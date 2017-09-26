import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      //    {path:'admin', AdminPanelComponent},
      //    {path:'organizations', OrganizatonsListComponent}
      //    {path:'organizations/new', OrganizatonFormComponent}
      //    {path:'organizations/view/:id', OrganizatonViewComponent}
      { path: 'organizations/', component: OrganizationListComponent }

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
