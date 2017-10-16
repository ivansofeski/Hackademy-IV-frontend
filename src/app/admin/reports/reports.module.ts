import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClosedProjectsComponent } from './closed-projects/closed-projects.component';
import { MatTableModule, MatSortModule, MatCardModule, MatDatepickerModule } from '@angular/material';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatDatepickerModule
  ],
  declarations: [ClosedProjectsComponent]
})
export class ReportsModule { }
