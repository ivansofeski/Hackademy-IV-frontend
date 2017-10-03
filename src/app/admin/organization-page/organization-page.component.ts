import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IOrganization } from '../interface/organization';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.component.html',
  styleUrls: ['./organization-page.component.scss']
})
export class OrganizationPageComponent implements OnInit {

  _organizationId: number = 0;
  organization: any;
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
          console.log(this.organization);
        },
        error => {
          console.log(error);
          this.errors.push(error);
        }
      );
    }
  }
  constructor(public route: ActivatedRoute, public router: Router,private dataService: DataService) { }

  ngOnInit() {
    this.organizationId = +this.route.snapshot.paramMap.get('id');
  }

}
