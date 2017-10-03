
import { ProjectService } from './project.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectListComponent } from './project-list/project-list.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectsRoutingModule
  ],
  providers: [ProjectService],
  declarations: [ProjectsComponent, ProjectListComponent]
})
export class ProjectsModule { }
