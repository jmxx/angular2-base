import { Component } from '@angular/core';

import { FormComponent } from './form.component';

export class Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'hello-app',
  template: `
    <div>
      <p>{{ message }}</p>
      <form-component></form-component>
    </div>
  `,
  directives: [
    FormComponent
  ]
})
export class HelloApp {
  message : string  = '';
  title   : string  = 'Tour of Heroes';
  hero    : Hero    = {
    id: 1,
    name: 'Windstorm'
  };

  constructor() {
    this.message = this.title;
  }
}
