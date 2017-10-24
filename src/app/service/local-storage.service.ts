/**
 * @desc: this service will take care of register, get and update the current user in/from the local storage
 */

import {Injectable} from '@angular/core';
// import { GeolocationService } from './geolocation.service';

@Injectable()
export class LocalStorageService {
  localStorageKey = 'currentUser';
  user: string;
  currentUser = {};
  lat;
  lng;
  errors: any[] = [];


  constructor() {
  }

  /**
   * @desc: check if the localStorage user exist and if not create one
   */
  createLocalStorageUser() {
    this.user = localStorage.getItem(this.localStorageKey);

    if (this.user == null || this.user === undefined) {

      this.currentUser['id'] = Math.floor(Math.random() * 100000) + 1;
      this.currentUser['userImage'] = './assets/photos/userImage1.jpeg';
      this.currentUser['userName'] = 'Nano user';
      this.currentUser['userSlogan'] = 'Go nano!';
      this.currentUser['wallet'] = {'total': 0, 'donated': 0};
      this.currentUser['savedProject'] = [];
      this.currentUser['donatedProject'] = [];
      // this.setLocation(this.currentUser);
      this.currentUser['userLocation'] = {'lat': this.lat, 'lng': this.lng};
      this.user = JSON.stringify(this.currentUser);
      localStorage.setItem(this.localStorageKey, this.user);

    }
  }

  /**
   * @desc this function will return the user from the localStorage and return it as an object
   * @returns {any}
   */
  getCurrentUser() {
    this.user = localStorage.getItem(this.localStorageKey);
    let userObject: any;
    if (this.user == null || this.user === undefined) {
      this.createLocalStorageUser();
      this.user = localStorage.getItem(this.localStorageKey);
      userObject = JSON.parse(this.user);
    } else if (this.user !== null || this.user !== undefined) {
      userObject = JSON.parse(this.user);
    }
    return userObject;
  }

  /**
   * @desc this function will stringify the given user and update the existing user in the localStorage
   * @param user
   */
  updateCurrnetUser(user: any): void {
    this.user = localStorage.getItem(this.localStorageKey);

    if (user !== null || user !== undefined) {
      if (this.user !== null || this.user !== undefined) {
        const updatedUser = JSON.stringify(user);
        localStorage.setItem(this.localStorageKey, updatedUser);
      } else {
        this.createLocalStorageUser();
      }
    }
  }
}
