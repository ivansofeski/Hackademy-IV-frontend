import { FormControl, Validator, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Project } from '../interface/project';
import { INPUT_ATTRIBUTES, NUMBERS } from './project-form.constants';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})

export class ProjectFormComponent implements OnInit {
  attributes = INPUT_ATTRIBUTES;
  @ViewChild('projectForm') projectForm: ElementRef;
  projectControls: Object = {
    descImage:  new FormControl('', [Validators.required]),
    name:       new FormControl('', [Validators.required]),
    orgName:    new FormControl('', [Validators.required]),
    goal:       new FormControl('', [Validators.required]),
    address:    new FormControl('', [Validators.required]),
    shortDesc:  new FormControl('', [Validators.required]),
    desc:       new FormControl('', [Validators.required])
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

  allowNumbers(e) {
    let _validate = true;

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

    if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
      _validate = true;
    }

    if (!_validate) {
      e.preventDefault();
    }
  }

  constructor() { }

  ngOnInit() {
    if (this.projectForm !== undefined) {
      const inputs = this.projectForm.nativeElement.querySelectorAll('input:not([type="hidden"]), textarea');

      if (inputs !== undefined && inputs.length === Object.keys(INPUT_ATTRIBUTES).length) {
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

          if (input.name === 'GOAL') {
            input.addEventListener('keydown', this.allowNumbers);
          }
        }
      }
    }
  }
}
