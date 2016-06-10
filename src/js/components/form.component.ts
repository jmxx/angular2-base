import { Component } from '@angular/core';
import { FormBuilder, ControlGroup, Control, Validators } from '@angular/common';
import { FormInputComponent } from './form.input';

@Component({
  selector: 'form-component',
  template: require('./form.component.html'),
  directives: [
    FormInputComponent
  ]
})
export class FormComponent {
  private form: ControlGroup;
  name = '';

  constructor(private builder: FormBuilder) {
    this.form = builder.group({
      username: new Control('', Validators.required),
      password: new Control('', Validators.required),
      name: new Control('', Validators.required),
    });
  }

  onSubmit(value) {
    console.log(this.form.value);
    console.log(value);
  }
}
