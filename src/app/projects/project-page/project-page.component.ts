import { Component, OnInit, ViewChildren, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
 
  projectImages=[];
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
    private projectService: ProjectService) { }

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
          for (let projectImage of this.project.images){
            this.projectImages.push({visible:false, image: projectImage});
            console.log(this.projectImages);
          } 
          this.projectImages[0].visible=true;
        },
        error => this.errors.push(error)
      );

  
      
    }
  
  swipe(currentIndex: number, action: string = this.SWIPE_ACTION.RIGHT) {
    console.log(currentIndex);
    if (currentIndex > this.projectImages.length || currentIndex < 0) return;

    let nextIndex = 0;
    
    // next
    if (action === this.SWIPE_ACTION.LEFT) {
      console.log("this right");
        const isLast = currentIndex === this.projectImages.length - 1;
        nextIndex = isLast ? 0 : currentIndex + 1;
    }

    // previous
    if (action === this.SWIPE_ACTION.RIGHT) {
        console.log("this left");
      
        const isFirst = currentIndex === 0;
        nextIndex = isFirst ? this.projectImages.length - 1 : currentIndex - 1;
    }

    // toggle avatar visibility
    this.projectImages.forEach((x, i) => x.visible = (i === nextIndex));
    console.log(currentIndex);
    this.paginatorChange(currentIndex, nextIndex);
    
}

paginatorChange(previousIndex:number, nextIndex:number){

  let activePage= <HTMLElement>document.querySelectorAll(".circle-page")[previousIndex];
  activePage.style.backgroundColor="white";
  let toBeActivePage= <HTMLElement>document.querySelectorAll(".circle-page")[nextIndex];
  toBeActivePage.style.backgroundColor="gray";

}

}
