import { Component, OnInit, ViewChildren, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { DataService } from '../../shared/services/data.service';

// Interfaces
import { Activity } from '../../interfaces/activity';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss', './_project-page.component-theme.scss']
})
export class ProjectPageComponent implements OnInit {

  projectImages = [];
  _projectId: number;
  project: any;
  projectActivities: Activity[];
  errors: any[] = [];

   donateOption1= 10;
  donateOption2= 25;
  donateOption3= 50;

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private projectService: DataService) { }

    ngOnInit() {

      this._projectId = +this.route.snapshot.paramMap.get('id');
      console.log(this._projectId);
      const project_activity = this.projectService.getActivities();
      const project = this.projectService.getProjects();
      project.subscribe(
        res => {
          this.project = res.find(retrunedProject => retrunedProject.id === this._projectId);
          project_activity.subscribe(
            res => {
               console.log(res);
              this.projectActivities = res.filter((k, v) => k.projectId == this.project.projectId); 
              // The above line was odified by Al to match the new interfaced. 
              // This whole block was moved here to set the project activities after getting the project. 
              for (const projectImage of this.project.images){
                this.projectImages.push({visible: false, image: projectImage});
                console.log(this.projectImages);
              }
              this.projectImages[0].visible = true;
            },
            error => this.errors.push(error)
          );
    
        },
        error => this.errors.push(error)
      );
    }

  swipe(currentIndex: number, action: string = this.SWIPE_ACTION.RIGHT) {
    console.log(currentIndex);
    if (currentIndex > this.projectImages.length || currentIndex < 0) {
      return;
    }

    let nextIndex = 0;

    // next
    if (action === this.SWIPE_ACTION.LEFT) {
      console.log('this right');
        const isLast = currentIndex === this.projectImages.length - 1;
        nextIndex = isLast ? 0 : currentIndex + 1;
    }

    // previous
    if (action === this.SWIPE_ACTION.RIGHT) {
        console.log('this left');

        const isFirst = currentIndex === 0;
        nextIndex = isFirst ? this.projectImages.length - 1 : currentIndex - 1;
    }

    // toggle avatar visibility
    this.projectImages.forEach((x, i) => x.visible = (i === nextIndex));
    console.log(currentIndex);
    this.paginatorChange(currentIndex, nextIndex);

}

paginatorChange(previousIndex: number, nextIndex: number) {

  const activePage = <HTMLElement>document.querySelectorAll('.circle-page')[previousIndex];
  activePage.style.backgroundColor = 'white';
  const toBeActivePage = <HTMLElement>document.querySelectorAll('.circle-page')[nextIndex];
  toBeActivePage.style.backgroundColor = 'gray';

}

}
