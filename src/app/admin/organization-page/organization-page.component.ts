import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Organization } from '../../interfaces/organization';

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.component.html',
  styleUrls: ['./organization-page.component.scss']
})
export class OrganizationPageComponent implements OnInit {

  _organizationId: number = 0;
  _organization: any;
  errors: any[] = [];

  get organizationId():number{
    return this._organizationId;
  }

  set organizationId(value:number){
    this._organizationId = value;
    if(value > 0){
      this.dataService.getOrganizations().subscribe(
        res => {
          this.organization = res.filter((v, k) => v.id == value)[0];
        },
        error => {
          console.log(error);
          this.errors.push(error);
        }
      );
    }
  }

  get organization(){
    return this._organization;
  }

  set organization(value: Organization){
    this._organization = value;
    this.dataService.getProjects().subscribe(
      res => this._organization.projects = res.filter((v,k) => v.organizationId == value.id),
      error => this.errors.push(error)
    );
  }


  constructor(public route: ActivatedRoute, public router: Router,private dataService: DataService) { }

  ngOnInit() {
    this.organizationId = +this.route.snapshot.paramMap.get('id');
  }

}
