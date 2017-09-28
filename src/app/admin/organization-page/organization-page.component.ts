import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Organization } from '../interface/organization';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.component.html',
  styleUrls: ['./organization-page.component.scss']
})

export class OrganizationPageComponent implements OnInit {

  organizationId = 0;
  organization: any;
  errors: any[] = [];

  constructor(public route: ActivatedRoute, public router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.organizationId = +this.route.snapshot.paramMap.get('id');

    if (this.organizationId > 0) {
      this.dataService.loadData.organizations().subscribe(
        res => {
          this.organization = res.filter((v, k) => v.id === this.organizationId)[0];
          console.log(this.organization);
        },
        error => {
          console.log(error);
          this.errors.push(error);
        }
      );
    }
  }

}
