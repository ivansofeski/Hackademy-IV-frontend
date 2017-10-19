import { ActivitiesService } from './../services/activities.service';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validator, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, DoCheck, QueryList } from '@angular/core';
import { Activity } from '../interface/activity';
import { INPUT_ATTRIBUTES, NUMBERS, REGEX_UNITS } from './activity-form.constants';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {
  @ViewChild('activityForm') activityForm: ElementRef;
  functions: ActivityFormFunctions;
  inputs: Function;
  errorsTwo: QueryList<String>;
  loadedProject: Object;
  newActivity: Activity = {
    projectId: 0,
    activityId: 1,
    activityTitle: '',
    activityDescription: '',
    activityDate: '',
    activityImage: '',
  };
  links = {
    list: '/admin/projects/',
    new: '/admin/projects/new/'
  };
  attributes = INPUT_ATTRIBUTES;
  errors: any[] = [];
  activityControls = {

    descImage: new FormControl('', []),
    name: new FormControl('', [Validators.required]),
    projectId: new FormControl('', [Validators.required, Validators.pattern(REGEX_UNITS.PROJECT)]),
    activityDate: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
  };

  setAttributes(options: any): void {
    console.log(options);
  }

  setImagePath(elm: HTMLInputElement): void {
    if (elm === undefined || elm.value === '') {
      console.log('elm', elm);
      return;
    }

    const _imgSelector = elm.parentElement.querySelectorAll('img')[0];
    console.log('image selector', _imgSelector);

    if (_imgSelector !== undefined) {
      const fReader = new FileReader();

      fReader.readAsDataURL(elm.files[0]);
      fReader.onloadend = function (event) {
        _imgSelector.src = event.target['result'];
        _imgSelector.parentElement.classList.add('no-border');
        console.log();
      };
    }
  }

  // This function provides a white list of characters/symbols/numbers and etc.
  // Specific inputs use this function to enable or disable the user on Client side depending on the pattern forseen.
  // Switch statement checks which Input by it's "name" attribute and applies a set of statements and then sets _validate.
  // Then in the end of the function depending if it validates to TRUE or FALSE we set e.preventDefault()
  inputWhiteList(e) {
    let _validate = true;
    const _target = e.currentTarget;

    switch (_target.name) {
      case 'START_DATE':
        if (!NUMBERS.hasOwnProperty(e.keyCode)) {
          _validate = false;
        }

        if ((e.shiftKey || e.altKey) && NUMBERS.hasOwnProperty(e.keyCode)) {
          _validate = false;
        }

        if (e.ctrlKey) {
          if (e.keyCode === 65) {
            _validate = true;
          }
        }

        if (e.keyCode === 191 || e.keyCode === 111) {
          const _currValue = _target.value.trim();

          if (_currValue.length > 0) {
            const _lastChar = _currValue.charAt(_currValue.length - 1);

            _validate = _lastChar === '/' ? false : true;

            if (_currValue.split('/').length > 2) {
              _validate = false;
            }
          }
        }
        break;
      default:
        break;
    }

    if (!_validate) {
      e.preventDefault();
    }
  }

  setHiddenInputs(inputName: string, value: any): void {
    if (this.activityControls[inputName] !== undefined) {
      this.activityControls[inputName].setValue(value);
    }
  }

  setProjectId(value: any, input: HTMLInputElement): void {
    this.activityControls.projectId.setValue(value);
    // this.projectControls.orgId.updateValueAndValidity();
  }

  getactivitiesProject: Function = (): void => {
    this._activitiesService.project.subscribe(
      project => {
        if (project !== undefined && Object.keys(project).length > 0) {
          this.loadedProject = project;
          console.log(project);
        } else {
          const projId = +this._router.snapshot.paramMap.get('id');
          this._dataService.getProjects().subscribe(
            projects => {
              if (projects !== undefined && projects.length > 0) {
                this.loadedProject = projects.filter((v, k) => {
                  return v.id = projId;
                })[0];
              }
            }
          );
        }
      }
    );
  }

  constructor(private _router: ActivatedRoute, private _dataService: DataService, private _activitiesService: ActivitiesService) { }

  ngOnInit() {
    this.functions = new ActivityFormFunctions(this.activityForm, this._activitiesService);
    this.inputs = this.functions.setInputAttributes;
    this.getactivitiesProject();
    if (this.inputs !== undefined) {
      this.inputs();
    }
  }

}

export class ActivityFormFunctions {
  setInputAttributes: Function = (): void => {
    if (this._form !== undefined) {
      const inputs = this._form.nativeElement.querySelectorAll('input:not([type="hidden"]), textarea');

      if (inputs !== undefined && inputs.length > 0) {
        for (const input of inputs) {
          const _name = input['name'];

          if (INPUT_ATTRIBUTES.hasOwnProperty(_name)) {
            const attributes = INPUT_ATTRIBUTES[_name];

            for (const key in attributes) {
              if (attributes.hasOwnProperty(key)) {
                if (key !== 'placeholder') {
                  input.setAttribute(key, attributes[key]);
                }
              }
            }
          }
        }
      }
    }
  }

  /* getactivitiesProject: Function = (proj: Object): void => {
    this._activitiesService.project.subscribe(
      project => {
         proj = project;
         console.log(project);
      }
    );
  } */

  constructor(private _form: ElementRef, private _activitiesService: ActivitiesService) { }
}
