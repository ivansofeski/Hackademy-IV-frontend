import {Component, OnInit, Input} from '@angular/core';
import {ProjectService} from '../project.service';
import {LocalStorageService} from '../../service/local-storage.service';
import {Project} from '../project.interface';


@Component({
  // selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  errors: any[] = [];
  projectList: any[] = [];
  project: Project;
  currentUser: any;

  donateOption1 = 10;
  donateOption2 = 25;
  donateOption3 = 50;

  constructor(private _projectService: ProjectService,
              private _localStorageService: LocalStorageService) {
  }

  ngOnInit() {

    this.currentUser = this._localStorageService.getCurrentUser();

    this._projectService.getProjects().subscribe(
      res => {
        console.log(res);
        this.projectList = res.filter((v, k) => {
            return v.open === 'true';

          },
          error => this.errors.push(error)
        );
      }
    );
  }

  clickLike(id: number): void {
    this._projectService.getSelectedProject(id).subscribe(
      res => {
        this.project = res;

        console.log('**************************************************************');
        console.log('current user from click');
        this.currentUser = this._localStorageService.getCurrentUser();

        if (this.currentUser.savedProject === undefined) {
          console.log('creating array')
          this.currentUser.savedProject = [];
        }
        if (this.currentUser.savedProject.indexOf(this.project.id) === -1 ||
          this.currentUser.savedProject.indexOf(this.project.id) === null ||
          this.currentUser.savedProject.indexOf(this.project.id) === undefined ) {

          console.log('updating array')
          this.currentUser.savedProject.push(this.project.id);
          console.log(this.currentUser);
          this._localStorageService.updateCurrnetUser(this.currentUser);
          console.log(localStorage.getItem('currentUser'));
        }
      }
    );
  }
}
