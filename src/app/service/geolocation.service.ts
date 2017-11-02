import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';

declare var google: any;
@Injectable()

export class GeolocationService {
  geocoder: any;

  constructor(private _http: HttpClient, private mapsAPILoader: MapsAPILoader) {
    if (this.mapsAPILoader.load) { // mapsAPILoader.load() was failing the service creation test.
      this.mapsAPILoader.load().then(() => {
        this.geocoder = new google.maps.Geocoder();
      });
    }
  }
  lat: number;
  lng: number;
  location= {'lat': this.lat,
    'lng': this.lng};
  ipInfo;
  getGeolocation(): Observable<any> {
    return Observable.create(observer => {
      this.getIPLocation().subscribe(res => {
        this.ipInfo = res;
        console.log(this.ipInfo);
      });
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log('Latitude: ' + this.lat +
          ' -- Longitude: ' + this.lng);
          this.location['lat'] = this.lat;
          this.location['lng'] = this.lng;
          observer.next(this.location);
          observer.complete();
        },
        error => {
          if (error.PERMISSION_DENIED) {
            console.log('Geolocation is denied by the user.');
          } else if (error.POSITION_UNAVAILABLE) {
            console.log('Geolocation is not availabe.');
          }
          console.log('IP address is used to locate the user.');
          this.lat = this.ipInfo.lat;
          this.lng = this.ipInfo.lon;
          this.location['lat'] = this.lat;
          this.location['lng'] = this.lng;
          observer.next(this.location);
          observer.complete();
        });
      } else {
        console.log('Geolocation is not supported by this browser.');
        console.log('IP address is used to locate the user.');
        this.lat = this.ipInfo.lat;
        this.lng = this.ipInfo.lon;
        this.location['lat'] = this.lat;
        this.location['lng'] = this.lng;
        observer.next(this.location);
        observer.complete();
      }
    });
  }
  getIPLocation() {
    return this._http.get('//ip-api.com/json') // ...using post request
    .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }

  getAddressLocation(address) {
    // const geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
      this.geocoder.geocode({'address': address}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
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
}
