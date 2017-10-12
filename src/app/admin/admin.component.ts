import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
    const _adminPath = this._router.url.endsWith('admin');

    if (_adminPath) {
      this._router.navigateByUrl('/admin/dashboard');
    }
  }
}
