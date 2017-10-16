import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClosedProjectsComponent } from './closed-projects/closed-projects.component';
import { MatTableModule, MatSortModule, MatCardModule, MatDatepickerModule, MatSelectModule } from '@angular/material';
/* import { Month } from './months/months';
import { MonthPicker } from './months/month-picker'; */


@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatDatepickerModule,
    MatSelectModule  
  ],
  declarations: [ClosedProjectsComponent]
})
export class ReportsModule { }
