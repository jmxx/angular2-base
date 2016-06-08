import { Component } from '@angular/core';

export class Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'hello-app',
  template: '<p>{{ message }}</p>'
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