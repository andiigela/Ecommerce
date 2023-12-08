import {FormControl, ValidationErrors} from "@angular/forms";
export class FormValidators {
    static notOnlyWhiteSpaces(formControl: FormControl): ValidationErrors {
        if(formControl.value != null && formControl.value.trim().length === 0){
            return { notOnlyWhiteSpaces: true };
        } else {
            return {};
        }
    }
}
