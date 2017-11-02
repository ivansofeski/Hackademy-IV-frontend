import { Project } from '../../interfaces/project';
import { GeolocationService } from '../../service/geolocation.service';
import { FormControl, FormBuilder, FormGroup, Validator, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, DoCheck, QueryList } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { NanoValidators } from '../services/nano-validators';
import { Organization } from '../../interfaces/organization';

declare var google: any;
@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})

export class ProjectFormComponent implements OnInit, DoCheck {
  @ViewChild('projectForm') projectForm: ElementRef;
  organizations: Organization[] = [];
  errors: any[] = [];
  lat: number;
  lng: number;
  projForm: Project;
  projectControls = {
    descImage:    new FormControl('', []),
    name:         new FormControl('', [NanoValidators.required]),
    projectId:    new FormControl('', [NanoValidators.required, Validators.pattern(/^([A-Za-z0-9]{6})+[-]+([A-Za-z0-9]{4})/)]),
    manager:      new FormControl('', [NanoValidators.required]),
    orgId:        new FormControl('', [NanoValidators.required]),
    fromDate:     new FormControl(new Date(), [Validators.required]),
    toDate:       new FormControl(null, []),
    goal:         new FormControl('', [NanoValidators.required, Validators.min(1), NanoValidators.NaN]),
    address:      new FormControl('', [NanoValidators.required]),
    shortDesc:    new FormControl('', [NanoValidators.required]),
    desc:         new FormControl('', [NanoValidators.required]),
    national:     new FormControl('false', [NanoValidators.required])
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

  setHiddenInputs(inputName: string, value: any): void {
    if (this.projectControls[inputName] !== undefined) {
      this.projectControls[inputName].setValue(value);
    }
  }

  setOrganizationId(value: any, input: HTMLInputElement): void {
    this.projectControls.orgId.setValue(value);
  }


  hardReset(evt): void {
    const form = this.fb.group(
      this.projectControls
    );

    if (form !== undefined) {
      for (const name in form.controls) {
        if (form.controls.hasOwnProperty(name)) {
          form.controls[name].setValue(null);
          form.controls[name].setErrors(null);
        }
      }
    }
  }

  constructor(private _fetcher: DataService, private fb: FormBuilder, private _geoLocationService: GeolocationService) {
    this.projectControls.toDate.setValidators([
      Validators.required,
      (c: AbstractControl) => c.value < new Date() ?  {'wrongdate': 'Wrong Date'} : null,
      (c: AbstractControl): ValidationErrors | null => {
        return this.projectControls.toDate.value && this.projectControls.fromDate.value &&
        this.projectControls.toDate.value < this.projectControls.fromDate.value ? {'impossibleDate': true} : null;
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
          }
        },
        error => this.errors.push(error)
      );
    }

    this.projForm = {
      mainImage:           '',
      projectName:         '',
      projectNumber:       '0',
      projectManager:      '',
      organizationId:      0,
      fromDate:            0,
      toDate:              0,
      amountToBeRaised:    0,
      raisedFunding:        0,
      address:              '',
      description:         '',
      nationalProject:     false,
      images:         [''],
      latitude:         0,
      longitude:       0,
      recurringProject: false,
  };
  }

  onSubmit() {
    this._geoLocationService.getAddressLocation(this.projectControls.address.value)
    .subscribe(coords => {
      if (this.projForm && Object.keys(this.projForm).length > 0) {
        this.projForm = {
          mainImage:           this.projectControls.descImage.value,
          projectName:         this.projectControls.name.value,
          projectNumber:       this.projectControls.projectId.value,
          projectManager:      this.projectControls.manager.value,
          organizationId:      this.projectControls.orgId.value,
          fromDate:            this.projectControls.fromDate.value,
          toDate:              this.projectControls.toDate.value,
          amountToBeRaised:    this.projectControls.goal.value,
          raisedFunding:        0,
          address:              this.projectControls.address.value,
          description:         this.projectControls.desc.value,
          nationalProject:     this.projectControls.national.value,
          images:              null,
          recurringProject: false,
          latitude :           coords.lat(),
          longitude:           coords.lng()
        };
      }

      this._fetcher.postProject(JSON.stringify(this.projForm)).subscribe(
        response => console.log(response)
     );
    });
  }

  ngDoCheck(): void {}
}
