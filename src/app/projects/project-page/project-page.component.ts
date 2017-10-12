import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project.interface';
import { Activity } from '../activity.interface';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {
  projectImages=[
      {
          image: "./assets/photos/project001/main/001.jpg",
          visible: true
      },
      {
          image: "./assets/photos/project001/main/002.jpg",
          visible: false
      },
      {
          image: "./assets/photos/project001/main/003.jpg",
          visible: false
      }
  ]
  _projectId: number = 0;
  project: any;
  projectActivities:Activity[];
  errors: any[] = [];

   donateOption1= 10;
  donateOption2= 25;
  donateOption3= 50;

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  constructor(
    public route: ActivatedRoute, 
    public router: Router,
    private projectService: ProjectService) {  
    }

    ngOnInit() {
      this._projectId = +this.route.snapshot.paramMap.get('id');
      console.log(this._projectId)
      let project_activity = this.projectService.getProjectActivities(this._projectId)
      let project = this.projectService.getSelectedProject(this._projectId);
      project.subscribe(
        res => {
          console.log(res)
          this.project = res;
          },
        error => this.errors.push(error)
      );
      project_activity.subscribe(
        res => {
           console.log(res)
          this.projectActivities = res;
        },
        error => this.errors.push(error)
      );
    
  
      
    }
  
  swipe(currentIndex: number, action: string = this.SWIPE_ACTION.RIGHT) {
    console.log(currentIndex);
    if (currentIndex > this.projectImages.length || currentIndex < 0) return;

    let nextIndex = 0;
    
    // next
    if (action === this.SWIPE_ACTION.RIGHT) {
        const isLast = currentIndex === this.projectImages.length - 1;
        nextIndex = isLast ? 0 : currentIndex + 1;
    }

    // previous
    if (action === this.SWIPE_ACTION.LEFT) {
        const isFirst = currentIndex === 0;
        nextIndex = isFirst ? this.projectImages.length - 1 : currentIndex - 1;
    }

    // toggle avatar visibility
    this.projectImages.forEach((x, i) => x.visible = (i === nextIndex));
}



}
