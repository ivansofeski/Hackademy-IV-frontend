import { FormControl, Validator, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Project } from '../interface/project';
import { INPUT_ATTRIBUTES, NUMBERS } from './project-form.constants';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})

export class ProjectFormComponent implements OnInit {
  public mytime: Date = new Date();
  
  projectListLink = '';
  attributes = INPUT_ATTRIBUTES;
  @ViewChild('projectForm') projectForm: ElementRef;
  projectControls=  {
    descImage:        new FormControl('', [Validators.required]),
    name:             new FormControl('', [Validators.required]),
    fromDate:         new FormControl('', [Validators.required]),
    toDate:           new FormControl('', [Validators.required, (c) => {return c.value < new Date() ?  {'wrongdate': 'Wrong Date'} : null}]),   
    orgName:          new FormControl('', [Validators.required]),
    goal:             new FormControl('', [Validators.required]),
    address:          new FormControl('', [Validators.required]),
    shortDesc:        new FormControl('', [Validators.required]),
    desc:             new FormControl('', [Validators.required])
  };
  constructor() { 
  
  this.projectControls.toDate.setValidators([Validators.required, (c) => {return c.value < new Date() ?  {'wrongdate': 'Wrong Date'} : null},(c:AbstractControl):ValidationErrors | null => {
    return this.projectControls.toDate.value < this.projectControls.fromDate.value ? {'impossibleDate':true} :null }]);

}
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
      case 'GOAL':
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
        break;
      case 'FROM_DATE':
      case 'TO_DATE':
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

  validateForm(form: Element): boolean {
    const _validateForm = false;
    console.log(form);
    return _validateForm;
  }

  

  ngOnInit() {
    if (this.projectForm !== undefined) {
      const inputs = this.projectForm.nativeElement.querySelectorAll('input:not([type="hidden"]), textarea');

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

          if (input.name === 'GOAL' || input.name.indexOf('DATE') > -1) {
            input.addEventListener('keydown', this.inputWhiteList);
          }
        }
      }
    }
  }
}
