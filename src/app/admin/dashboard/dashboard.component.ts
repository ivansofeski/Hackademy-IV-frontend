import { Component, OnInit } from '@angular/core';
import { STRINGS } from './dashboard.constants';

// Interfaces
import { Organization } from '../../interfaces/organization';
import { Project } from '../../interfaces/project';

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
  organizations: Organization[] = [];
  projects: Project[]           = [];
  closedProjects: Project[]     = [];
  errors: any[]                 = [];
  latest                        = 5;
  sections: { organizations: Organization[], projects: Project[], closedProjects: Project[] } = {
    organizations: [],
    projects: [],
    closedProjects: []
  };

  private readonly _getLatestOrganizations: Function = (): void => {
    if (this._dataService.getOrganizations) {
      this._dataService.getOrganizations().subscribe(
        res => {
          this.organizations = res && res.length > this.latest ? res.slice(Math.max(res.length - this.latest, 1)) : res;
          this.sections.organizations = this.organizations;
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
          this.projects = res && res.length > this.latest ? res.slice(Math.max(res.length - this.latest, 1)) : res;
          this.sections.projects = this.projects;

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

    this.closedProjects = projects.filter((proj, i, obj) => {
      if (proj.hasOwnProperty('raisedFunding') && proj.hasOwnProperty('amountToBeRaised') && proj.hasOwnProperty('toDate')) {
        const _projToDate = new Date(+proj.toDate);

        if (_projToDate < _today || proj.raisedFunding === proj.amountToBeRaised) {
          return proj;
        }
      }
    });

    if (this.closedProjects.length > this.latest) {
      this.closedProjects = this.closedProjects.slice(Math.max(this.closedProjects.length - this.latest, 1));
    }

    this.sections.closedProjects = this.closedProjects;

    console.log(this.sections);
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

  readonly initData: Function = (): void => {
    if (this._getLatestOrganizations && this._getLatestProjects) {
      this._getLatestOrganizations();
      this._getLatestProjects();
    }
  }

  ngOnInit() {
    if (this.initData) {
      this.initData();
    }
  }

  constructor(private _dataService: DataService) { }
}
