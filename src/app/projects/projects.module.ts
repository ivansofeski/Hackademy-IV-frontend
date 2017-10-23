
import { ProjectService } from './project.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectListComponent } from './project-list/project-list.component';
import {SharedModule} from '../shared/shared.module';
// import { GeolocationComponent } from '../geolocation/geolocation.component';
import { AgmCoreModule } from '@agm/core';
import { ProjectPageComponent } from './project-page/project-page.component';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';



export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      'swipe': {velocity: 0.4, threshold: 20} // override default settings
  }
}

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectsRoutingModule
  ],
  providers: [
    ProjectService,
    {
      provide: HAMMER_GESTURE_CONFIG,
       useClass: MyHammerConfig
    }
  ],
  declarations: [ProjectsComponent, ProjectListComponent,  ProjectPageComponent]
})
export class ProjectsModule { }

