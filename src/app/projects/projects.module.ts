import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectService } from './project.service';




@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,   
  ],
  providers:[ProjectService],
  declarations: [ProjectsComponent]
})
export class ProjectsModule { }
