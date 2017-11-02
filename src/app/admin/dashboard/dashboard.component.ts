// Modules
import { Component, OnInit } from '@angular/core';

// Constants
import { STRINGS } from './dashboard.constants';

// Interfaces
import { Organization } from '../../interfaces/organization';
import { Project } from '../../interfaces/project';
import { Activity } from '../../interfaces/activity';

// Services
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  strings                       = STRINGS;
  lng                           = 'US';
  errors: any[]                 = [];
  latest                        = 5;
  sections: { organizations: Organization[], projects: Project[], closedProjects: Project[], activities: Activity[] } = {
    organizations: [],
    projects: [],
    closedProjects: [],
    activities: []
  };
  allProjects: Project[];
  allOrganizations: Organization[];

  private readonly _getLatestOrganizations: Function = (): void => {
    if (this._dataService.getOrganizations) {
      this._dataService.getOrganizations().subscribe(
        res => {
          this.allOrganizations = res;
          this.sections.organizations = res && res.length > this.latest ? res.slice(Math.max(res.length - this.latest, 1)) : res;
          this.sections.organizations.reverse();
        },
        error => {
          this.errors.push(error);
          console.log(this.errors);
        }
      );
    }
  }

  private readonly _getLatestProjects: Function = (): void => {
    if (this._dataService.getProjects) {
      this._dataService.getProjects().subscribe(
        res => {
          this.allProjects = res;
          this.sections.projects = res && res.length > this.latest ? res.slice(Math.max(res.length - this.latest, 1)) : res;
          this.sections.projects.reverse();

          if (this._getLatestClosedProjects) {
            this._getLatestClosedProjects(res);
          }
        },
        error => {
          this.errors.push(error);
          console.log(this.errors);
        }
      );
    }
  }

  private readonly _getLatestClosedProjects: Function = (projects: Project[]): void => {
    if (!projects || projects.length <= 0) {
      return;
    }

    const _today = new Date();

    this.sections.closedProjects = projects.filter((proj, i, obj) => {
      if (proj.hasOwnProperty('raisedFunding') && proj.hasOwnProperty('amountToBeRaised') && proj.hasOwnProperty('toDate')) {
        const _projToDate = new Date(+proj.toDate);

        if (_projToDate < _today || proj.raisedFunding === proj.amountToBeRaised) {
          return proj;
        }
      }
    });

    if (this.sections.closedProjects.length > this.latest) {
      this.sections.closedProjects = this.sections.closedProjects.slice(Math.max(this.sections.closedProjects.length - this.latest, 1));
    }

    this.sections.closedProjects.reverse();
  }

  private readonly _getLatestActivities: Function = (): void => {
    this._dataService.getActivities().subscribe(
      res => {
        this.sections.activities = res && res.length > this.latest ? res.slice(Math.max(res.length - this.latest, 1)) : res;
        this.sections.activities.reverse();

        this.sections.activities.forEach((act, i, obj) => {
          if (act && act.projectId && this.allProjects && this.allProjects.length > 0) {
            const _tempProj = this.allProjects.filter((v, k) => {
              return v.id = act.projectId;
            })[0];

            if (_tempProj && _tempProj.hasOwnProperty('projectName')) {
              act['projectName'] = _tempProj.projectName;
            }
          }
        });
      },
      error => this.errors.push(error)
    );
  }

  private readonly _getSectionLabel: Function = (section: string): string => {
    if (!section || typeof section !== 'string' || section.trim().length <= 0) {
      return;
    }

    const _camelSplitter = (_str: string): string => {
      const temp = _str;
      _str = '';

      if (temp && typeof temp === 'string' && temp.trim().length > 0) {
        for (const letter of temp) {
          _str += letter.toUpperCase() === letter ? ' ' + letter : letter;
        }
      }

      return _str.trim().toLowerCase();
    };

    return _camelSplitter(section);
  }

  private readonly _getPropertDateFormat: Function = (date: any): string => {
    date = typeof date === 'number' ? new Date(+date).toDateString() : new Date(date).toDateString();

    return date;
  }

  private readonly _getRouterLink: Function = (section: string, row: Object): string => {
    let _link = '';

    if (!section || typeof section !== 'string' || section.trim().length <= 0 || !row || Object.keys(row).length <= 0) {
      return;
    }

    let _id = '';

    switch (section.toLowerCase()) {
      case 'organizations':
        _id = row.hasOwnProperty('organizationId') && row['organizationId'] !== undefined ? row['organizationId'] : _id;
        _link = `/admin/organizations/view/${_id}`;
        break;
      case 'projects':
      case 'closedprojects':
        _id = row.hasOwnProperty('id') && row['id'] !== undefined ? row['id'] : _id;
        _link = `/admin/projects/view/${_id}`;
        break;
      default:
        break;
    }

    return _link;
  }

  readonly initData: Function = (): void => {
    if (this._getLatestOrganizations && this._getLatestProjects && this._getLatestActivities) {
      this._getLatestOrganizations();
      this._getLatestProjects();
      this._getLatestActivities();
    }
  }

  ngOnInit() {
    if (this.initData) {
      this.initData();
    }
  }

  constructor(private _dataService: DataService) { }
}
