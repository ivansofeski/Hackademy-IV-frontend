import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../projects/project.service';

@Component({
  //selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss']
})
export class GeolocationComponent implements OnInit {
  lat:number;
  lng:number;
  zoom:number;
  projects=[]
  constructor(private _projectService: ProjectService) { 
    this.showPosition();
  }

  ngOnInit() {
  }

  showPosition(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position=>{this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 16;
        console.log("Latitude: " + this.lat +
        " -- Longitude: " + this.lng);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    this._projectService.getProjects().subscribe(
      res => {
        console.log(res);
        this.projects = res;
      });
  }

  
}
