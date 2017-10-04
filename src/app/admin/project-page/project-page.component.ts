import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  _projectId: number = 0;
  project: any;
  errors: any[] = [];

  get projectId():number{
    return this._projectId;
  }

  set projectId(value:number){
    this._projectId = value;
    if(value > 0){
      this.dataService.getProjects().subscribe(
        res => {
          this.project = res.filter((v, k) => v.id == value)[0];
        },
        error => {
          this.errors.push(error);
        }
      );
    }
  }
  constructor(public route: ActivatedRoute, public router: Router,private dataService: DataService) { }

  ngOnInit() {
    this.projectId = +this.route.snapshot.paramMap.get('id');
  }

}
