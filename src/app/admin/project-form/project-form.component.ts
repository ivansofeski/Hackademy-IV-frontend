import { FormControl, FormBuilder, FormGroup, Validator, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Project } from '../interface/project';
import { INPUT_ATTRIBUTES, NUMBERS, REGEX_UNITS } from './project-form.constants';
import { Organization } from '../interface/organization';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})

export class ProjectFormComponent implements OnInit {
  @ViewChild('projectForm') projectForm: ElementRef;

  newProject: Project = {
    id: 0,
    projectName: '',
    toDate: '',
    fromDate: '',
    address: '',
    neededFunding: 0,
    raisedFunding: 0,
    description: '',
    mainImage: '',
    projectManager: '',
    projectId: '',
    organizationName: '',
    organizationId: 0
  };
  projectListLink = '/admin/projects/';
  attributes = INPUT_ATTRIBUTES;
  organizations: Organization[] = [];
  errors: any[] = [];
  projectControls = {
    descImage:    new FormControl('', [Validators.required]),
    name:         new FormControl('', [Validators.required]),
    projectId:    new FormControl('', [Validators.required, Validators.pattern(REGEX_UNITS.PROJECT)]),
    manager:      new FormControl('', [Validators.required, Validators.pattern(REGEX_UNITS.LETTERS)]),
    orgName:      new FormControl('', [Validators.required]),
    fromDate:     new FormControl(null , [Validators.required]),
    toDate:       new FormControl(null , []),
    goal:         new FormControl('', [Validators.required]),
    address:      new FormControl('', [Validators.required]),
    shortDesc:    new FormControl('', [Validators.required]),
    desc:         new FormControl('', [Validators.required])
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

  setOrganizationId(value: any, input: HTMLInputElement): void {
    input.value = value;
  }

  // Not implemented fully!
  saveProject() {
    this._fetcher.getProjects().subscribe(
      res => {
        if (res !== undefined && res.length > 0) {
          const last_project = res[res.length - 1];

          const all_inputs = document.querySelectorAll('input:not([type="hidden"]), textarea');

          if (all_inputs !== undefined) {
            for (const input in all_inputs) {
            }
          }

          this.newProject = {
            id: last_project.id++,
            projectName: '',
            toDate: '',
            fromDate: '',
            address: '',
            neededFunding: 0,
            raisedFunding: 0,
            description: '',
            mainImage: '',
            projectManager: '',
            projectId: '',
            organizationName: '',
            organizationId: 0
          };
          localStorage.setItem('newProject', JSON.stringify(this.newProject));
        }
      },
      error => this.errors.push(error)
    );
  }

  constructor(private _fetcher: DataService) {
    this.projectControls.toDate.setValidators([
      Validators.required,
      (c: AbstractControl) => c.value < new Date() ?  {'wrongdate': 'Wrong Date'} : null,
      (c: AbstractControl): ValidationErrors | null => {
        return this.projectControls.toDate.value < this.projectControls.fromDate.value ? {'impossibleDate': true} : null;
      }
    ]);
  }

  ngOnInit() {
    if (this.organizations !== undefined) {
      this._fetcher.getOrganizations().subscribe(
        res => {
          if (res !== undefined && res.length > 0) {
            this.organizations = res;

            this.organizations.sort((a, b) => {
              const _a = a.name.toLowerCase();
              const _b = b.name.toLowerCase();

              switch (true) {
                case _a < _b:
                  return -1;
                case _a > _b:
                  return 1;
                default:
                  return 0;
              }
            });
            console.log(this.organizations);
          }
        },
        error => this.errors.push(error)
      );
    }

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
