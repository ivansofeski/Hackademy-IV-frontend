import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export class NanoValidators{
    static required(c: AbstractControl):ValidationErrors|null{
        if(c.value == null || c.value.trim().length == 0 )
        return {'required': 'Required'};
    }
}
