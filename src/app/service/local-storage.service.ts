import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {
  localStorageKey = 'currentUser';
  user: string;
  currentUser = {};
  errors: any[] = [];


  constructor() {
  }


  createLocalStorageUser() {
    this.user = localStorage.getItem(this.localStorageKey);

    if (this.user == null || this.user === undefined) {

      this.currentUser['id'] = Math.floor(Math.random() * 100000) + 1;
      this.currentUser['userImage'] = './assets/photos/userImage1.jpeg';
      console.log('creating local storage user');
      console.log(this.currentUser);

      this.user = JSON.stringify(this.currentUser);
      console.log('current user stringfied');
      console.log(this.user);
      localStorage.setItem(this.localStorageKey, this.user);
    }
  }

  getCurrentUser() {
    this.user = localStorage.getItem(this.localStorageKey);
    let userObject: any;
    console.log('getcuurentUser()')
    if (this.user == null || this.user === undefined){
      console.log('user undefined --- create one')
      this.createLocalStorageUser();
      this.user = localStorage.getItem(this.localStorageKey);
      userObject = JSON.parse(this.user);
    } else if (this.user !== null || this.user !== undefined) {
      console.log('get current user');
      userObject = JSON.parse(this.user);
    }
    return userObject;
  }

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
