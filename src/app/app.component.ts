import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'app';
  public currentUser: string = localStorage.getItem('currentUser');

  constructor () {
 // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {

    if (this.currentUser == null || this.currentUser === undefined) {
      this.currentUser = JSON.stringify({
        'id': 1,
        'userName': 'Natasa',
        'userSlogan': 'Do your home work in time',
        'userImage': './assets/photos/userImage1.jpeg',
        'wallet': { 'total': 0, 'donated': 125 },
        'savedProject': [1, 2, 3, 4]
      });
      console.log(this.currentUser);
      localStorage.setItem('currentUser', this.currentUser);
    } else { console.log('asdasdasdas');}
  }

}
