
import { ProjectService } from './project.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectListComponent } from './project-list/project-list.component';
import {SharedModule} from '../shared/shared.module';
import { GeolocationComponent } from '../geolocation/geolocation.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectsRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCHC4hLZ_ogiMaGy9kVZl4u0gjocEyw3EA'
    })
  ],
  providers: [ProjectService],
  declarations: [ProjectsComponent, ProjectListComponent, GeolocationComponent]
})
export class ProjectsModule { }
