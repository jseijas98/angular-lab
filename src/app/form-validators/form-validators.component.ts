import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import formUtils from './formUtils';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-validators',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './form-validators.component.html',
  styleUrl: './form-validators.component.css',
  providers: [formUtils],
})
export default class FormValidatorsComponent implements OnInit {
  constructor() {
    this.form = this.crateform();
  }

  private _formBuilder = inject(FormBuilder);
  private utils = inject(formUtils);
  form: FormGroup;

  crateform(): FormGroup {
    return this._formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        this.onlyLettersValidator(),
        this.oneOrTwoNamesValidator(),
        Validators.maxLength(30),
        Validators.minLength(3),
      ]),
      lastName: [''],
    });
  }

  onlyLettersValidator(): ValidatorFn {
    const onlyLettersRegex = this.utils.onlyLetters; // Expresión regular para solo letras y acentos
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && !onlyLettersRegex.test(value)) {
        return { onlyLetters: true }; // Agrega la propiedad 'onlyLetters' al objeto de error
      } else {
        return null; // Validación exitosa
      }
    };
  }

  oneOrTwoNamesValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      // Verificar si hay uno o dos nombres y la última cadena no termina con espacio en blanco
      if (value) {
        const names = value.split(' ')// Dividir y eliminar espacios vacíos
        if (names.length > 0 && names.length <= 2 && !/\s$/.test(names[names.length - 1])) {
          return null; // Validación exitosa
        } else {
          return { oneOrTwoNames: true }; // Agregar la propiedad 'oneOrTwoNames' al objeto de errores
        }
      } else {
        return null; // Si el valor es vacío, la validación no aplica
      }
    };
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
  
    if (!control) return '';
  
    switch (true) {
      case control.hasError('required'):
        return 'Value is required';
      case control.hasError('onlyLetters'):
        return 'Only letters are allowed';
      case control.hasError('oneOrTwoNames'):
        return 'solo un espacio entre nombres';
      case control.hasError('minlength'):
        return 'Minimum characters reached';
      default:
        return '';
    }
  }

  formValiderrors(FormControlname: string) {
    return this.form.get(FormControlname)?.errors
  }


  ngOnInit(): void {
    console.log('form');
  }
}
