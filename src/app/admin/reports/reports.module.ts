import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClosedProjectsComponent } from './closed-projects/closed-projects.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ClosedProjectsComponent]
})
export class ReportsModule { }
