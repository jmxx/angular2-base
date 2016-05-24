import { Component } from '@angular/core';

@Component({
  selector: 'hello-app',
  template: '<p>{{ message }}</p>'
})
export class HelloApp {
  constructor() {
    this.message = 'Hello Angular 2';
  }
}