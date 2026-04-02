import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormValidationService {

    validateThatThePropertyIsNotJustBlanks(control: AbstractControl) {
        return control.value.trim().length === 0 && control.value !== ''
            ? { propertyBlank: true }
            : null;
    }
}