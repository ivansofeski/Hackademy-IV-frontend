import { ActivatedRoute, Router } from '@angular/router';
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
  errorsTwo: QueryList<String>;
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
    activityImage:    new FormControl('', []),
    name:             new FormControl('', [Validators.required]),
    projectId:        new FormControl('', [Validators.required, Validators.pattern(REGEX_UNITS.PROJECT)]),
    activityDate:     new FormControl('', [Validators.required]),
    desc:             new FormControl('', [Validators.required]),
  };

  setAttributes(options: any): void {
    console.log(options);
  }

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


  constructor(private _router: Router) { }

  ngOnInit() {
  }
}
