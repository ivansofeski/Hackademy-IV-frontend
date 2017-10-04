import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DonorOverviewComponent} from './donor-overview/donor-overview.component';
import {DonorComponent} from './donor.component';

const routes: Routes = [
  { path: '', component: DonorComponent, children: [
    {path: 'donor', component: DonorOverviewComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonorRoutingModule { }
