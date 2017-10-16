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
  radius:number;
  projects=[]
  iconUrl={url:"../assets/icons/pin.png",
            scaledSize: {
              height: 50,
              width: 50
            }
          }
  iconUrlProject={url:"../assets/icons/blueMarker.png",
          scaledSize: {
            height: 35,
            width: 25
          }
        }
  constructor(private _projectService: ProjectService) { 
    this.showPosition();
  }

  ngOnInit() {
  }

  showPosition(){
    this.radius=4000;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position=>{this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
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

  dragEnd(event){
    console.log(this.lat);
    this.lat=event.coords.lat;
    console.log(this.lat);
    console.log(this.lng);
    this.lng=event.coords.lng;
    console.log(this.lng);
  }

  mapClicked(event) {
      this.lat = event.coords.lat;
      this.lng = event.coords.lng;
  }
  
}
