// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

// Components
import { ClosedProjectsComponent } from './closed-projects/closed-projects.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ClosedProjectsComponent]
})

export class ReportsModule { }
