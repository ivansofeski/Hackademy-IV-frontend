import { Component, OnInit } from '@angular/core';
import { NewProject } from '../../interface/project';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-closed-projects',
  templateUrl: './closed-projects.component.html',
  styleUrls: ['./closed-projects.component.scss']
})
export class ClosedProjectsComponent implements OnInit {

  color = 'primary';
  mode = 'determinate';
  proList: NewProject[] = [];
  projectId: number = 0;
  project: any;
  errors: any[] = [];

  constructor(public route: ActivatedRoute, public router: Router, private dataService: DataService) { }
  
  ngOnInit() {
    this.dataService.getNewProjects().subscribe(
      res => {
        //console.log(res);
        this.proList = res.filter((v, k) => {
          return v.status === 'false';
        });

        this.dataService.getNewOrganizations().subscribe(
          res => {
            for (const proj of this.proList) {
              proj['organization'] = res.filter((v, k) => {
                return v.id === proj.orgId;
              })[0];
              delete proj.orgId;
            }

            console.log(this.proList);
          },
          error => this.errors.push(error)
        )
      },
      error => this.errors.push(error)
    );

    /* this.proList = this.dataService.getClosedProjects(this.proList, { open: "false" });
    console.log(this.proList); */
  }

}
