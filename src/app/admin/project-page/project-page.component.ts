import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Interfaces
import { Activity } from '../../interfaces/activity';
import { Project } from '../../interfaces/project';

// Services
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})

export class ProjectPageComponent implements OnInit {
  _projectId = 0;
  _project: any;
  errors: any[] = [];
  projectActivities: Activity[];

  get project(){
    return this._project;
  }

  set project(value: Project){
    this._project = value;
    if (value.organizationId > 0 ) {
      this._dataService.getOrganizations().subscribe(
        res => {
          this._project.organization = res.filter((v, k) => v.organizationId === value.organizationId)[0];
        },
        error => this.errors.push(error)
      );
    } else {
      this._project.organization = null;
    }
/*
    this._dataService.getActivities().subscribe(
      activities => {
        if (activities && activities.length > 0) {
          this.projectActivities = activities.filter((v, k) => v.projectId === value.projectId);
        }
      },
      error => this.errors.push(error)
    );
*/
  }

  get projectId(): number {
    return this._projectId;
  }

  set projectId(value: number) {
    this._projectId = value;
    if (value > 0) {
      this._dataService.getProjectById(value).subscribe(
        res => {
          this.project = res;
        },
        error => {
          this.errors.push(error);
        }
      );
    }
  }

  constructor(public route: ActivatedRoute, public router: Router, private _dataService: DataService) { }

  ngOnInit() {
    this.projectId = +this.route.snapshot.paramMap.get('id');
  }

  eventButton() {
    this._dataService.storeProject(this.project);
    this.router.navigateByUrl('/admin/projects/view/' + this.projectId + '/new');
  }
}
