import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  color = 'primary';
  mode = 'determinate';
  value = 44;
  bufferValue = 75;
  constructor() { }

  ngOnInit() {
  }

}
