import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validator, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, DoCheck, QueryList } from '@angular/core';
import { DataService } from '../services/data.service';
import { NanoValidators } from '../services/nano-validators';
import { Project } from '../interface/project';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {
  @ViewChild('activityForm') activityForm: ElementRef;

  inputs: Function;
  errorsTwo: QueryList<String>;
  loadedProject: Project;

  errors: any[] = [];
  activityControls = {
    descImage:   new FormControl('', []),
    name:        new FormControl('', [NanoValidators.required]),
    activityDate: new FormControl('', [Validators.required]),
    desc:         new FormControl('', [NanoValidators.required]),
  };

  setImagePath(elm: HTMLInputElement): void {
    if (elm === undefined || elm.value === '') {
      return;
    }

    const _imgSelector = elm.parentElement.querySelectorAll('img')[0];

    if (_imgSelector !== undefined) {
      const fReader = new FileReader();

      fReader.readAsDataURL(elm.files[0]);
      fReader.onloadend = function (event) {
        _imgSelector.src = event.target['result'];
        _imgSelector.parentElement.classList.add('no-border');
      };
    }
  }

  constructor(private _router: ActivatedRoute, private _dataService: DataService) { }

  ngOnInit() {
    const projId = +this._router.snapshot.paramMap.get('id');
    this._dataService.getProjects().subscribe(
      projects => {
        if (projects !== undefined && projects.length > 0) {
          this.loadedProject = projects.filter((v, k) => {
            return v.id == projId;
          })[0];
        }
      }
    );
  }
}