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

  _projectId: number;
  projectInfo: any;
  projectActivities: Activity[];
  errors: any[] = [];

  donateOption1= 10;
  donateOption2= 25;
  donateOption3= 50;

  constructor(
    public route: ActivatedRoute, 
    public router: Router,
    private projectService: ProjectService) {  
    }


  
  
    ngOnInit() {
      this._projectId = +this.route.snapshot.paramMap.get('id');
      let project = this.projectService.getSelectedProject(this._projectId);
      project[0].subscribe(
        res => {
          this.projectInfo = res;
        },
        error => this.errors.push(error)
      );
      project[1].subscribe(
        res => {
          console.log(res)
          this.projectActivities = res;
        },
        error => this.errors.push(error)
      );
    

      
    }
  


  onBack(): void {
    this.router.navigate(['home']);
  }

}
