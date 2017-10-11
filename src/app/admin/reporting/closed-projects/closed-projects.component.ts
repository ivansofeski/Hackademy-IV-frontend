import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Project } from '../../interface/project';
import { FormControl, Validators } from '@angular/forms';


const monthAsMicroSeconds = 30*24*60*60*1000;
@Component({
  selector: 'app-closed-projects',
  templateUrl: './closed-projects.component.html',
  styleUrls: ['./closed-projects.component.scss']
})
export class ClosedProjectsComponent implements OnInit {

  now: Date = new Date();
  allProjects: Project[];
  projectList: Project[];
  errors: any[];

  controls = {
    toDate:     new FormControl(new Date(), [Validators.required]),
    fromDate:       new FormControl(new Date(new Date().valueOf() - monthAsMicroSeconds), [Validators.required]),
  };

  constructor(private dataService: DataService) { 

  }

  filterProjects(){
    this.projectList = this.allProjects.filter((v,k) => {
      let date:Date = new Date(v.toDate);
      let value:boolean = date < this.now &&  date <= this.controls.toDate.value && date >= this.controls.fromDate.value;
      console.log(date, this.controls.toDate.value, this.controls.fromDate.value, value);
      return value;
    });
  }
  ngOnInit() {
    this.dataService.getProjects().subscribe(
      res => {
        this.allProjects = res;
        this.filterProjects();
      },
      error => this.errors.push(error)
    );
  }

}
