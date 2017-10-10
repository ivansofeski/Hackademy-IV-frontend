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

  _projectId: number = 0;
  _project: any;
  errors: any[] = [];

  donateOption1= 10;
  donateOption2= 25;
  donateOption3= 50;

  constructor(
    public route: ActivatedRoute, 
    public router: Router,
    private projectService: ProjectService) {  
    }

    get projectId():number{
      return this._projectId;
    }

    set projectId(value:number){
      this._projectId = value;
      if(value > 0){
        this.projectService.getProjects().subscribe(
          res => {
            this._project = res.filter((v, k) => v.id == value)[0];
          },
          error => {
            console.log(error);
            this.errors.push(error);
          }
        );
      }
    }

    get project(){
      return this._project;
    }
  
  
    ngOnInit() {
      this.projectService.getProjects().subscribe(
        res => {
          console.log(res);
          this._project = res;
        },
        error => this.errors.push(error)
      ); 
    

      this.projectId = +this.route.snapshot.paramMap.get('id');
    }
  


  onBack(): void {
    this.router.navigate(['home']);
  }

}
