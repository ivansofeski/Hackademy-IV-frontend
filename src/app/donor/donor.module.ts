import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonorRoutingModule } from './donor-routing.module';
import { DonorOverviewComponent } from './donor-overview/donor-overview.component';
import { DonorComponent } from './donor.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DonorRoutingModule
  ],
  declarations: [DonorOverviewComponent, DonorComponent]
})
export class DonorModule { }
