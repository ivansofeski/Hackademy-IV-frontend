import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit, Directive } from '@angular/core';
import {} from 'googlemaps';
import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import {Observable} from 'rxjs/Observable';
import {Project} from '../interfaces/project';
import {Router} from '@angular/router';

// Services
import {GeolocationService} from '../service/geolocation.service';
import {LocalStorageService} from '../service/local-storage.service';
import { DataService } from '../shared/services/data.service';
import { GoogleMap } from '@agm/core/services/google-maps-types';


declare var google: any;

@Component({
  // selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss',
    './_geolocation.component-theme.scss']
})
export class GeolocationComponent implements OnInit, AfterViewInit {
  map: GoogleMap;
  lat: number;
  lng: number;
  zoom: number;
  radius: number;
  projects = [];
  currentlat: number;
  currentlng: number;
  inputAddressElm;
  hide_default = true;
  center_changed = false;
  user;
  showUser = true;
  currentLocationTab = true;
  geocoder;

  style = [
    {
      'featureType': 'all',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#f5f5f5'
        }
      ]
    },
    {
      'featureType': 'all',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#f5f5f5'
        }
      ]
    },
    {
      'featureType': 'all',
      'elementType': 'labels.icon',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'all',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#616161'
        }
      ]
    },
    {
      'featureType': 'all',
      'elementType': 'labels.text.stroke',
      'stylers': [
        {
          'color': '#f5f5f5'
        }
      ]
    },
    {
      'featureType': 'administrative',
      'elementType': 'all',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'administrative.country',
      'elementType': 'all',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'administrative.land_parcel',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#bdbdbd'
        }
      ]
    },
    {
      'featureType': 'poi',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#eeeeee'
        }
      ]
    },
    {
      'featureType': 'poi',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#757575'
        }
      ]
    },
    {
      'featureType': 'poi.attraction',
      'elementType': 'all',
      'stylers': [
        {
          'visibility': 'on'
        }
      ]
    },
    {
      'featureType': 'poi.business',
      'elementType': 'all',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'poi.government',
      'elementType': 'all',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'poi.park',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#e5e5e5'
        }
      ]
    },
    {
      'featureType': 'poi.park',
      'elementType': 'labels.text',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'poi.park',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'visibility': 'off'
        },
        {
          'color': '#9e9e9e'
        }
      ]
    },
    {
      'featureType': 'poi.place_of_worship',
      'elementType': 'all',
      'stylers': [
        {
          'visibility': 'on'
        }
      ]
    },
    {
      'featureType': 'road',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#ffffff'
        }
      ]
    },
    {
      'featureType': 'road.arterial',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#757575'
        }
      ]
    },
    {
      'featureType': 'road.highway',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#dadada'
        }
      ]
    },
    {
      'featureType': 'road.highway',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#616161'
        }
      ]
    },
    {
      'featureType': 'road.local',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#9e9e9e'
        }
      ]
    },
    {
      'featureType': 'transit.line',
      'elementType': 'all',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'transit.line',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#e5e5e5'
        }
      ]
    },
    {
      'featureType': 'transit.station',
      'elementType': 'all',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'transit.station',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#eeeeee'
        }
      ]
    },
    {
      'featureType': 'water',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#c9c9c9'
        }
      ]
    },
    {
      'featureType': 'water',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#9e9e9e'
        }
      ]
    }
  ];

  @ViewChild('search')
  public searchElementRef: ElementRef;

  @ViewChild('searchButton')
  public searchButtonElementRef: ElementRef;

  iconUrl = {
    url: '../assets/icons/person-location.png',
    scaledSize: {
      height: 45,
      width: 35
    }
  };
  iconUrlProject;

  constructor(private _dataService: DataService,
              private mapsAPILoader: MapsAPILoader,
              private _mapsWrapper: GoogleMapsAPIWrapper,
              private ngZone: NgZone,
              private _geolocationService: GeolocationService,
              public router: Router,
              private _localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    if (this.showUser === true) {
      this.user = this._localStorageService.getCurrentUser();
      this.inputAddressElm = this.searchElementRef.nativeElement;
      const searchButtElm = document.getElementById('searchButton');
    }
    this.mapsAPILoader.load().then(() => {
      this.iconUrlProject = {
        url: '../assets/icons/project-icon.png',
        size: new google.maps.Size(45, 45),
        anchor: new google.maps.Point(22.5, 22.5)
      };

      // google.maps.addListener('zoom_changed', () => {
      //   this.zoom = 1;
      // });
      // this.geocoder = new google.maps.Geocoder();
      this.showUserPosition();
      this.loadProjects();
      const autocomplete = new google.maps.places.Autocomplete(this.inputAddressElm, {
        types: ['address']
      });

      // this.searchButtonElementRef.nativeElement.addListener("click", this.search());
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
          if (this.currentLocationTab === false) {
            this.center_changed = true;
          }
        });
      });
    });
  }

  ngAfterViewInit() {
    this._mapsWrapper.getNativeMap().then(returnedMap => {
      this.map = returnedMap;
    });
  }

  showUserPosition() {
    this.radius = 4000;
    this.zoom = 12;
    this._geolocationService.getGeolocation().subscribe(location => {
      this.lat = location.lat;
      this.lng = location.lng;
      this.currentlat = this.lat;
      this.currentlng = this.lng;
    });
  }

  loadProjects(): any {
    this._dataService.getProjects()
      .subscribe( projectsList => {
        console.log(projectsList);
          projectsList.forEach(project => {
            if (project.latitude === null || project.longitude === null) {
              this._geolocationService.getAddressLocation(project.address)
                .subscribe(projectLocation => {
                  project.latitude = projectLocation.lat();
                  project.longitude = projectLocation.lng();
                });
            }
            // if (project.id === 13) {
            //   this._geolocationService.getAddressLocation(project.address)
            //   .subscribe(projectLocation => {
            //     console.log(project.id);
            //     console.log('latitude: ' + projectLocation.lat() + ',' + 'longitude: ' + projectLocation.lng() + ',' );
            //   });
            // }
        });
        this.projects = projectsList;
      });
    }

  dragEnd(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    if (this.currentLocationTab === false) {
      this.center_changed = true;
    }
  }

  mapClicked(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    if (this.currentLocationTab === false) {
      this.center_changed = true;
    }
  }

  onClick() {
    console.log('an address has been searched');
    this._geolocationService.getAddressLocation(this.inputAddressElm.value).subscribe(
      result => {
        // needs to run inside zone to update the map
        this.ngZone.run(() => {
          this.lat = result.lat();
          this.lng = result.lng();
          if (this.currentLocationTab === false) {
            this.center_changed = true;
          }
        });
      },
      error => console.log(error),
      () => console.log('Geocoding completed!')
    );
  }

  goToProjectPage(project: Project) {
    const path = 'projects/' + project.id;
    this.router.navigate([path]);
  }

  current_location() {
    this.currentLocationTab = true;
    this.hide_default = true;
    this.center_changed = false;
    this.lat = this.currentlat;
    this.lng = this.currentlng;
    const changedZoom = this.map.getZoom();
    this.map.setZoom(12);
    const changedCenter = this.map.getCenter();
    this.map.setCenter(google.maps.LatLng(this.lat, this.lng));
  }

  default_location() {
    this.currentLocationTab = false;
    this.hide_default = false;
    if (this.user.userLocation['lat'] !== undefined || this.user.userLocation['lat'] != null) {
      this.lat = this.user.userLocation.lat;
      this.lng = this.user.userLocation.lng;
      this.center_changed = false;
    } else {
      this.center_changed = true;
    }
  }

  confirm_location() {
    this.center_changed = false;
    this.user.userLocation.lat = this.lat;
    this.user.userLocation.lng = this.lng;
    this._localStorageService.updateCurrnetUser(this.user);
  }
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'my-custom-extension'
})
// tslint:disable-next-line:directive-class-suffix
export class MyCustomExtension implements AfterViewInit {
  constructor(private _wrapper: GoogleMapsAPIWrapper) {
    console.log('constructor');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this._wrapper.getNativeMap().then((m) => {
      console.log('native map', m);
    }, err => {
      console.log('error', err);
    });
  }
}
