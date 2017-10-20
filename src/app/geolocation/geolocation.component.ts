import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ProjectService } from '../projects/project.service';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { GeolocationService } from '../service/geolocation.service';
import { Project } from '../projects/project.interface';
import { Router } from '@angular/router';
declare var google: any;

@Component({
  //selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss']
})
export class GeolocationComponent implements OnInit {
  ipInfo:any;
  lat:number;
  lng:number;
  zoom:number;
  radius:number;
  projects=[]
  position;
  geocoder;
  inputAddressElm;
  
  @ViewChild("search")
  public searchElementRef: ElementRef;

  @ViewChild("searchButton")
  public searchButtonElementRef: ElementRef;

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
  constructor(private _projectService: ProjectService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    // private _http: HttpClient,
    private _geolocationService: GeolocationService,
    public router: Router) {
  }

  ngOnInit() {
    this.showPosition();
    this.inputAddressElm = this.searchElementRef.nativeElement;
    const searchButtElm = document.getElementById("searchButton");
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.inputAddressElm, {
        types: ["address"]
      });
      
      // this.searchButtonElementRef.nativeElement.addListener("click", this.search());
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
        });
      });     
    });
  }

  showPosition() {
    this.radius = 4000;
    this.zoom = 12;
    this._geolocationService.getGeolocation().subscribe(location => {
      this.lat = location.lat;
      this.lng = location.lng;
    });
    this._projectService.getProjects().subscribe(
      res => {
        console.log(res);
        this.projects = res;
      });
  }

  dragEnd(event) {
    console.log(this.lat);
    this.lat = event.coords.lat;
    console.log(this.lat);
    console.log(this.lng);
    this.lng=event.coords.lng;
    console.log(this.lng);
  }

  mapClicked(event) {
      this.lat = event.coords.lat;
      this.lng = event.coords.lng;
  }
  onClick(){
    console.log("an address has been searched");
    console.log(this.inputAddressElm.value);
    this.getLatLan(this.inputAddressElm.value).subscribe(
      result => {
        // needs to run inside zone to update the map
        this.ngZone.run(() => {
          console.log(this.lat);
            this.lat = result.lat();
            console.log(this.lat);
            console.log(this.lng);
            this.lng = result.lng();
            console.log(this.lng);
        });
    },
    error => console.log(error),
    () => console.log('Geocoding completed!')
    );
}

getLatLan(address: string) {
    console.log('Getting Address - ', address);
    let geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                observer.next(results[0].geometry.location);
                observer.complete();
            } else {
                console.log('Error - ', results, ' & Status - ', status);
                observer.next({});
                observer.complete();
            }
        });
    });
}

  goToProjectPage(project: Project) {
    const path = 'projects/' + project.id;
    this.router.navigate([path]);
  }
}
