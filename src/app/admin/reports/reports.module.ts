import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClosedProjectsComponent } from './closed-projects/closed-projects.component';
import { MatTableModule, MatSortModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatCardModule
  ],
  declarations: [ClosedProjectsComponent]
})
export class ReportsModule { }
