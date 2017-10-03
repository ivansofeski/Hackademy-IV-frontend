import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  color = 'primary';
  mode = 'determinate';
  proList: any[];
  projectId: number = 0;
  project: any;
  errors: any[] = [];

  constructor(public route: ActivatedRoute, public router: Router,private dataService: DataService) { }

  ngOnInit() {
    this.dataService.get.projects().subscribe(
      res => {
        //console.log(res);
        this.proList = res
      },
      error => this.errors.push(error)
    );
  }
}

