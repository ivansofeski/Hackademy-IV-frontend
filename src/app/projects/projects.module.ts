import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule
  ],
  declarations: [ProjectsComponent]
})
export class ProjectsModule { }
