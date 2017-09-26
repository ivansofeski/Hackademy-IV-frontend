import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminToolbarComponent } from './admin-toolbar/admin-toolbar.component';

// Services
import { DataService } from './services/data.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ],
  declarations: [AdminComponent, AdminToolbarComponent],
  providers: [DataService]
})
export class AdminModule { }
