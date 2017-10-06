import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonorRoutingModule } from './donor-routing.module';
import { DonorOverviewComponent } from './donor-overview/donor-overview.component';
import { DonorComponent } from './donor.component';
import { SharedModule } from '../shared/shared.module';
import {DonorOverviewService} from './donor-overview/donor-overview.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DonorRoutingModule
  ],
  providers: [DonorOverviewService],
  declarations: [DonorOverviewComponent, DonorComponent]
})
export class DonorModule { }
