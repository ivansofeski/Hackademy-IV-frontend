import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {
  user: string = localStorage.getItem('currentUser');
  currentUser = {};
  errors: any[] = [];


  constructor() {
  }


  create_localStorage_user() {
    if (this.user == null || this.user === undefined) {

      this.currentUser['id'] = Math.floor(Math.random() * 100000) + 1;
      this.currentUser['userImage'] = './assets/photos/userImage1.jpeg';
      console.log(this.currentUser);

      this.user = JSON.stringify(this.currentUser);
      console.log(this.user);
      localStorage.setItem('currentUser', this.user);
    }
  }
  getCurrentUser() {
    if (this.user !== null || this.user !== undefined) {
      console.log(JSON.parse(this.user));
      return JSON.parse(this.user);
    }
  }
}
