import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  triggerToggler: Function = (evt): void => {
    const toggler = document.querySelectorAll('.sidebar-toggle.expanded')[0];
    const event = new MouseEvent('mouseup', { bubbles: true });

    if (toggler) {
      toggler.dispatchEvent(event);
    }
  }

  ngOnInit() {
    const _adminPath = this._router.url.endsWith('admin');

    if (_adminPath) {
      this._router.navigateByUrl('/admin/dashboard');
    }
  }

  constructor(private _router: Router) { }
}
