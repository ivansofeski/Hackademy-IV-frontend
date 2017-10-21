import {Component, OnInit, Input} from '@angular/core';
import {ProjectService} from '../project.service';
import {LocalStorageService} from '../../service/local-storage.service';
import {Project} from '../project.interface';
import { GeolocationService } from '../../service/geolocation.service';


@Component({
  // selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss','./_project-list.component-theme.scss']
})
export class ProjectListComponent implements OnInit {
  errors: any[] = [];
  projectList: any[] = [];
  project: Project;
  currentUser: any;
  userLocation: any;
  localStorageKey = 'currentUser';
  isRed = false;
  isGray = true;

  donateOption1 = 10;
  donateOption2 = 25;
  donateOption3 = 50;

  constructor(private _projectService: ProjectService,
              private _localStorageService: LocalStorageService,
              private _geolocationService: GeolocationService) {
  }

  ngOnInit() {
    this.currentUser = this._localStorageService.getCurrentUser();
    this._geolocationService.getIPLocation().subscribe(location => {
      // this.currentUser.userLocation.lat = location.lat;
      // this.currentUser.userLocation.lng = location.lon;
      // const user = JSON.stringify(this.currentUser);
      // localStorage.setItem(this.localStorageKey, user);
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
    });
  }

  

  /**
   * this function will return a class that is responsible for activating and deactivating the color red in the
   * like button
   * @param {number} project_id
   * @returns {any}
   */
  likeButtonColor(project_id: number): any {
    const classes = {
      'heart-red': this.isRed,
      'heart-gray': this.isGray,
    };

    if (this.currentUser !== null || this.currentUser !== undefined) {
      if (this.currentUser.savedProject == null || this.currentUser.savedProject === undefined) {
        classes['heart-red'] = false;
        classes['heart-gray'] = true;
        return classes;

      } else {
        if (this.currentUser.savedProject.indexOf(project_id) > -1) {
          classes['heart-red'] = true;
          classes['heart-gray'] = false;
          return classes;

        } else {
          classes['heart-red'] = false;
          classes['heart-gray'] = true;
          return classes;

        }
      }
    }
  }

  /**
   * @desc this function is triggered whenever the like button is clicked and it will get the current
   * user from the local storage and check if they have liked any project and if not create an empty array list
   * and the push the liked project to it
   * and if the user has already liked the clicked project then it will remove it from the saved project
   * @param {number} id
   */
  toggleLikeButton(id: number): void {
    this.currentUser = this._localStorageService.getCurrentUser();

    if (this.currentUser.savedProject === undefined) {
      this.currentUser.savedProject = [];
    }

    // if the project is not already saved ... then save it in the array
    if (this.currentUser.savedProject.indexOf(id) === -1 ||
      this.currentUser.savedProject.indexOf(id) === null ||
      this.currentUser.savedProject.indexOf(id) === undefined) {

      this.currentUser.savedProject.push(id);
      this._localStorageService.updateCurrnetUser(this.currentUser);
    }

    // if the project is already saved .... then remove it from the saved list
    else if (this.currentUser.savedProject.indexOf(id) > -1 ) {
      const index = this.currentUser.savedProject.indexOf(id);
      this.currentUser.savedProject.splice(index, 1);
      this._localStorageService.updateCurrnetUser(this.currentUser);
    }
  }

}
