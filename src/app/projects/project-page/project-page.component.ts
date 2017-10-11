import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project.interface';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  _projectId: number;
  _projectInfo: any;
  _projectActivities: any;
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
      this._projectInfo = project[0].subscribe(
        res => {
          this._projectInfo = res;
        },
        error => this.errors.push(error)
      );
      this._projectActivities = project[1].subscribe(
        res => {
          this._projectInfo = res;
        },
        error => this.errors.push(error)
      );
    

      
    }
  


  onBack(): void {
    this.router.navigate(['home']);
  }

}
